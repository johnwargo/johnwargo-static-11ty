var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@1.6.3";

!function (e, a, t, n, s, i, c) {
  e.AlgoliaAnalyticsObject = s,
    e[s] = e[s] || function () {
      (e[s].queue = e[s].queue || []).push(arguments)
    },
    i = a.createElement(t),
    c = a.getElementsByTagName(t)[0],
    i.async = 1,
    i.src = n,
    c.parentNode.insertBefore(i, c)
}(window, document, "script", ALGOLIA_INSIGHTS_SRC, "aa");

aa('init', {
  appId: 'U413XZNY05',
  apiKey: 'acf81f2ea589e2e4364691072c5d4043'
});

const app = new Vue({
  el: '#app',
  data: {
    search: '',
    searching: false,
    algolia_client: null,
    algolia_index: null,
    results: null,
    numResults: null,
    noResults: false,
    queryID: null
  },
  created() {
    this.client = algoliasearch('U413XZNY05', 'acf81f2ea589e2e4364691072c5d4043');
    this.index = this.client.initIndex('jmw-idx');

    // support url param search
    let qp = new URLSearchParams(window.location.search);
    let search = qp.get('search');
    if (search) {
      this.search = search;
      this.doSearch();
    }
  },
  methods: {
    async doSearch() {
      this.results = null;
      if (this.search === '')
        return;
      this.searching = true;
      this.noResults = false;
      console.log('search for ' + this.search);
      let resultsRaw = await this.index.search(this.search, {
        attributesToRetrieve: [
          'title', 'url', 'date'
        ],
        attributesToSnippet: ['content'],
        hitsPerPage: 50,
        clickAnalytics: true
      });

      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      let formatter = new Intl.DateTimeFormat('en-US', options);
      resultsRaw.hits.forEach(h => {
        h.date = formatter.format(new Date(h.date));
      });
      this.results = resultsRaw.hits;
      this.numResults = resultsRaw.nbHits;
      this.searching = false;
      this.noResults = this.results.length === 0;
      this.queryID = resultsRaw.queryID;
    },
    track(url, id, pos) {
      aa('clickedObjectIDsAfterSearch', {
        eventName: 'click_on_search_page',
        index: 'random-errors-main',
        queryID: this.queryID,
        objectIDs: [id],
        positions: [pos]
      });
    }
  }
})
