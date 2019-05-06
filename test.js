const test = (req, res) => {

    // respond to this request with our fake-news content embedded within the BBC News home page
    res.merge('test', {
        // external url to fetch
        sourceUrl: 'http://www.kitcometals.com/charts/Lead.html',
        // css selector to inject our content into
        sourcePlaceholder: 'div[data-entityid="container-top-stories"]',
        // pass a function here to intercept the source html prior to merging
        transform: null
    });

}

module.exports = test;