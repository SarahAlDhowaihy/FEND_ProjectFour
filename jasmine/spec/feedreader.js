/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('The URL in the allFeeds, should be defined and not empty ',
            function() {
                for (const feed of allFeeds) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toBe({});
                }
            });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('The Name in the allFeeds, should be defined and not empty ',
            function() {
                for (const feed of allFeeds) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toBe({});
                }
            });
    });


    /* New test suite named "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The menu should be hidden by default', function() {
            let isHidden = document.body.classList.contains("menu-hidden");
            expect(isHidden).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('The menu changes when clicked show/hide', function() {
            const menuicon = document.querySelector('.menu-icon-link');
            //menuState get the value 
            //false if meun is shown
            // and true if is hiden
            let menuState;
            menuicon.click();
            menuState = document.body.classList.contains("menu-hidden");
            expect(menuState).not.toBe(true);
            menuicon.click();
            menuState = document.body.classList.contains("menu-hidden");
            expect(menuState).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('should be at least a single entry element after call loadFeed()', function(done) {
            let feedContainer = document.querySelector('.feed .entry');
            expect(feedContainer.children.length).toBeGreaterThan(0);
            done();
        });
    });
    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstFeed, secoundFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('.feed').textContent;
                loadFeed(1, function() {
                    secoundFeed = document.querySelector('.feed').textContent;
                    done();
                });
            });
        });
        it("The new feed loads should be different", function(done) {
            expect(firstFeed).not.toBe(secoundFeed);
            done();
        });
    });

}());
