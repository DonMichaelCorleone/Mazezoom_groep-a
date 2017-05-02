        var tl;

        function fillTimeLine() {
            var eventdata = {};
            console.info('fill timeline');
            $.getJSON('./json/Data.json', function (data) {
                console.info('get json');

                var items = [];

                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    items.push({
                        "caption":"Test caption",
                        "start": obj.location.start + '-01-01T13:37:00+00:00',
                        "end": obj.location.end + '-01-01T13:37:00+00:00',
                        "instant": false,
                        "title": obj.location.title,
                        "color": "#7FFFD4",
                        "textColor": "#ffff00",
                        "trackNum": i,
                        "classname": "special_event2 aquamarine",
                        "description": obj.location.description
                    });
                }
                eventdata = {
                    "dateTimeFormat": "iso8601",
                    "events": items
                };
            });
            console.info(eventdata);
            return eventdata;
        }

        function onLoad() {
            var eventSource = new Timeline.DefaultEventSource();
            var theme = Timeline.ClassicTheme.create();
            theme.event.highlightLabelBackground = true;
            theme.event.bubble.width = 320;

            var zones = [];
            var zones2 = [];

            var d = Timeline.DateTime.parseGregorianDateTime("2000");
            var bandInfos = [
                Timeline.createHotZoneBandInfo({
                    width: "75%",
                    intervalUnit: Timeline.DateTime.CENTURY,
                    intervalPixels: 250,
                    zones: zones,
                    eventSource: eventSource,
                    date: d,
                    timeZone: -6,
                    theme: theme
                }),
                Timeline.createHotZoneBandInfo({
                    width: "25%",
                    intervalUnit: Timeline.DateTime.CENTURY,
                    intervalPixels: 70,
                    zones: zones2,
                    eventSource: eventSource,
                    date: d,
                    overview: true,
                    theme: theme
                })
            ];
            bandInfos[1].syncWith = 0;
            bandInfos[1].highlight = true;

            //     {   start:    "Fri Nov 22 1963 11:00:00 GMT-0600",
            //         end:      "Sat Nov 23 1963 00:00:00 GMT-0600",
            //         magnify:  5,
            //         unit:     Timeline.DateTime.MINUTE,
            //         multiple: 10
            //     },
            //     {   start:    "Fri Nov 22 1963 12:00:00 GMT-0600",
            //         end:      "Fri Nov 22 1963 14:00:00 GMT-0600",
            //         magnify:  3,
            //         unit:     Timeline.DateTime.MINUTE,
            //         multiple: 5
            //     }
            // ];
            // var zones2 = [
            //     {   start:    "Fri Nov 22 1963 00:00:00 GMT-0600",
            //         end:      "Mon Nov 25 1963 00:00:00 GMT-0600",
            //         magnify:  10,
            //         unit:     Timeline.DateTime.WEEK
            //     },
            //     {   start:    "Fri Nov 22 1963 09:00:00 GMT-0600",
            //         end:      "Sun Nov 24 1963 00:00:00 GMT-0600",
            //         magnify:  5,
            //         unit:     Timeline.DateTime.DAY
            //     },
            //     {   start:    "Fri Nov 22 1963 11:00:00 GMT-0600",
            //         end:      "Sat Nov 23 1963 00:00:00 GMT-0600",
            //         magnify:  5,
            //         unit:     Timeline.DateTime.MINUTE,
            //         multiple: 60
            //     },
            //     {   start:    "Fri Nov 22 1963 12:00:00 GMT-0600",
            //         end:      "Fri Nov 22 1963 14:00:00 GMT-0600",
            //         magnify:  3,
            //         unit:     Timeline.DateTime.MINUTE,
            //         multiple: 15
            //     }
            // ];

            // theme.event.bubble.width = 250;

            // var date = "Fri Nov 22 1963 13:00:00 GMT-0600"
            // var bandInfos = [
            //     Timeline.createHotZoneBandInfo({
            //         width:          "80%", 
            //         intervalUnit:   Timeline.DateTime.WEEK, 
            //         intervalPixels: 200,
            //         zones:          zones,
            //         eventSource:    eventSource,
            //         date:           date,
            //         timeZone:       -6
            //       //  theme:          theme
            //     }),
            //     Timeline.createHotZoneBandInfo({
            //         width:          "20%", 
            //         intervalUnit:   Timeline.DateTime.MONTH, 
            //         intervalPixels: 200,
            //         zones:          zones2, 
            //         eventSource:    eventSource,
            //         date:           date, 
            //         timeZone:       -6,
            //         overview:       true
            //        // theme:          theme
            //     })
            // ];
            // bandInfos[1].syncWith = 0;
            // bandInfos[1].highlight = true;

            // for (var i = 0; i < bandInfos.length; i++) {
            //     bandInfos[i].decorators = [
            //         new Timeline.SpanHighlightDecorator({
            //             startDate:  "Fri Nov 22 1963 12:30:00 GMT-0600",
            //             endDate:    "Fri Nov 22 1963 13:00:00 GMT-0600",
            //             color:      "#FFC080",
            //             opacity:    50,
            //             startLabel: "shot",
            //             endLabel:   "t.o.d.",
            //            // theme:      theme,
            //            cssClass: 't-highlight1'
            //         }),
            //         new Timeline.PointHighlightDecorator({
            //             date:       "Fri Nov 22 1963 14:38:00 GMT-0600",
            //             color:      "#FFC080",
            //             opacity:    50,
            //             //theme:      theme,
            //             cssClass: 'p-highlight1'
            //         }),
            //         new Timeline.PointHighlightDecorator({
            //             date:       "Sun Nov 24 1963 13:00:00 GMT-0600",
            //             color:      "#FFC080",
            //             opacity:    50
            //             //theme:      theme
            //         })
            //     ];
            // }

            tl = Timeline.create(document.getElementById("timeline"), bandInfos, Timeline.HORIZONTAL);
            // show loading message
            tl.showLoadingMessage();
            // var event_data = fillTimeLine();
            // console.info(fillTimeLine());

            var event_data = {
                "dateTimeFormat": "iso8601",
                "events": [{
                        "start": "2009-03-10T06:00:00+00:00",
                        "end": "2009-03-31T22:00:00+00:00",
                        "instant": false,
                        "title": "1",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "caption": "1",
                        "trackNum": 1,
                        "classname": "special_event2 aquamarine",
                        "description": "bar 1"
                    },

                    {
                        "start": "2009-03-10T08:00:00+00:00",
                        "end": "2009-03-17T20:00:00+00:00",
                        "instant": false,
                        "title": "1.1",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 2,
                        "description": "bar 1.1"
                    },

                    {
                        "start": "2009-03-12T10:00:00+00:00",
                        "end": "2009-03-13T17:00:00+00:00",
                        "instant": false,
                        "title": "1.1.1",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 3,
                        "description": "bar 1.1.1"
                    },

                    {
                        "start": "2009-03-14T10:00:00+00:00",
                        "end": "2009-03-16T17:00:00+00:00",
                        "instant": false,
                        "title": "1.1.2",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 4,
                        "description": "bar 1.1.2"
                    },

                    {
                        "start": "2009-03-17T10:00:00+00:00",
                        "end": "2009-03-17T17:00:00+00:00",
                        "instant": false,
                        "title": "1.1.3",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 5,
                        "description": "bar 1.1.3"
                    },

                    {
                        "start": "2009-03-15T08:00:00+00:00",
                        "end": "2009-03-18T20:00:00+00:00",
                        "instant": false,
                        "title": "1.2",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 6,
                        "classname": "special_event2",
                        "description": "bar 1.2"
                    },

                    {
                        "start": "2009-03-15T10:00:00+00:00",
                        "end": "2009-03-18T17:00:00+00:00",
                        "instant": false,
                        "title": "1.2.1",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 7,
                        "classname": "backimage",
                        "description": "bar 1.2.1"
                    },

                    {
                        "start": "2009-03-16T10:00:00+00:00",
                        "end": "2009-03-17T17:00:00+00:00",
                        "instant": false,
                        "title": "1.2.2",
                        "color": "#7FFFD4",
                        "textColor": "#000000",
                        "trackNum": 8,
                        "description": "bar 1.2.2"
                    },

                    {
                        "start": "2009-04-01T06:00:00+00:00",
                        "end": "2009-04-20T22:00:00+00:00",
                        "instant": false,
                        "title": "2",
                        "color": "#000000",
                        "textColor": "#000000",
                        "trackNum": 9,
                        "description": "bar 2"
                    },

                    {
                        "start": "2009-03-10T06:00:00+00:00",
                        "end": "2009-03-12T20:00:00+00:00",
                        "instant": false,
                        "title": "3",
                        "textColor": "#000000",
                        "trackNum": 10,
                        "classname": "dashed aquamarine",
                        "description": "bar 3"
                    },

                    {
                        "start": "2009-03-11T10:00:00+00:00",
                        "end": "2009-03-12T17:00:00+00:00",
                        "instant": false,
                        "title": "3.1",
                        "textColor": "#000000",
                        "trackNum": 11,
                        "classname": "dotted brown",
                        "description": "bar 3.1"
                    }
                ]
            };
            //debugger;
            var timeline_items = this.fillTimeLine();
            eventSource.loadJSON(timeline_items, document.location.href);
            //eventSource.loadJSON(event_data, document.location.href);

            // dismiss loading message
            tl.hideLoadingMessage();
        }