(function() {
    PPTGenerator.controller('Songs', [
        '$scope', 
        '$filter', 
        'SongsService', 
        '$location', 
        '$routeParams', 
        '$cookies', 
        'permission', 
        'Alertify', 
        'ModalService',
        function($scope, $filter, SongsService, $location, $routeParams, $cookies, permission, Alertify, ModalService) {
            if (!permission) {
                $location.path('/');
            }
            //$scope.currentPage = 0;

            $scope.pageSize = 10;
            $scope.songFilter = '';
            $scope.songs = [];
            var totalCount = 0;

            function getData() {
                SongsService.getSongs().then(
                    function(songs) {
                        $scope.songs = songs.data;
                        if ($scope.songs.length > 0)
                            $scope.currentPage = 0;
                        else
                        if ($scope.songs.length == 0)
                            $scope.currentPage = -1;
                    },
                    function() {
                        $scope.currentPage = -1;
                    },

                );
            }

            getData();
            $scope.getData = function() {

                return $filter('filter')($scope.songs, $scope.songFilter);

            };



            $scope.numberOfPages = function() {

                return Math.ceil($scope.getData().length / $scope.pageSize);

            };

            $scope.checkPages = function() {
                if ($scope.numberOfPages() > 0) {
                    $scope.currentPage = 0;
                } else {
                    $scope.currentPage = -1;
                }
            };

            $scope.openModal = function(id, type = "Add") {
                $scope.modalTitle = type;
                ModalService.Open(id);
            }

            $scope.closeModal = function(id) {
                ModalService.Close(id);
                reset();


            }
            $scope.dataForm = {};
            $scope.slides = [];

            SongsService.getParts().then(
                function(res) {
                    $scope.Parts = res.data;
                }
            );
            $scope.submitted = false;
            $scope.slideCount = 0;
            $scope.tabDetails = false;
            $scope.back = false;
            $scope.OrderCount = 1;


            function reset() {
                $scope.OrderCount = 1;
                $scope.dataForm = {};
                $scope.slides.splice(0, $scope.slides.length);
                $scope.slideCount = 0;
                $scope.dataForm.Part = "";
                $scope.dataForm.Content = "";
            }



            function checkVal(data) {
                if (data.length > 0) {
                    for (var x = 0; data.length > x; x++) {
                        if (data[x] === undefined || data[x] === '') {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }

            }



            function insertSlide() {

                $scope.slides.push({
                    PartID: $scope.dataForm.Part,
                    Content: $scope.dataForm.Content,
                    OrderNumber: $scope.OrderCount++
                });
                console.log($scope.slides);
            }


            $scope.backSlide = function() {
                var back = angular.element(document.body).find('.form-modal');
                back.addClass('animated slideInLeft');

                var bool = true;
                if ($scope.slides.length < $scope.slideCount + 1 && ($scope.dataForm.Part != "" && $scope.dataForm.Content != "")) {
                    insertSlide();

                }

                if ($scope.slides.length < $scope.slideCount + 1) {
                    bool = false;

                }


                if (bool) {
                    $scope.slides[$scope.slideCount].PartID = $scope.dataForm.Part;
                    $scope.slides[$scope.slideCount].Content = $scope.dataForm.Content;
                }
                if ($scope.slides.length > 0) {

                    $scope.slideCount--;
                    $scope.dataForm.Part = $scope.slides[$scope.slideCount].PartID;
                    $scope.dataForm.Content = $scope.slides[$scope.slideCount].Content;


                }
                // console.log("back");
                // console.log($scope.slides);

                setTimeout(function() {

                    back.removeClass('animated slideInLeft');
                }, 1000);


            }

            $scope.nextSlide = function() {
                console.log($scope.slides.length);
                var next = angular.element(document.body).find('.form-modal');
                next.addClass('animated slideInRight');
                var bool = true;
                if ($scope.slides.length > $scope.slideCount) {
                    $scope.slides[$scope.slideCount].PartID = $scope.dataForm.Part;
                    $scope.slides[$scope.slideCount].Content = $scope.dataForm.Content;
                }
                $scope.slideCount++;


                if ($scope.slides.length > 0 && $scope.slideCount < $scope.slides.length) {
                    $scope.dataForm.Part = "";
                    $scope.dataForm.Content = "";
                    $scope.dataForm.Part = $scope.slides[$scope.slideCount].PartID;
                    $scope.dataForm.Content = $scope.slides[$scope.slideCount].Content;
                    bool = false;
                }

                if ($scope.slides.length < $scope.slideCount && ($scope.dataForm.Part != "" && $scope.dataForm.Content != "")) {
                    insertSlide();

                    $scope.dataForm.Part = "";
                    $scope.dataForm.Content = "";
                    bool = false;


                }
                $scope.back = true;
                if (bool) {
                    $scope.dataForm.Part = "";
                    $scope.dataForm.Content = "";
                }

                // console.log("next");
                // console.log($scope.slides);

                setTimeout(function() {
                    next.removeClass('animated slideInRight');

                }, 1000);


            }

            $scope.Submit = function() {
                $scope.submitted = true;
                if ($scope.dataForm.Part != "" && $scope.dataForm.Content != "") {
                    insertSlide();
                }
                var data = {
                    Details: $scope.dataForm,
                    Slides: $scope.slides
                };
                SongsService.addSong(data).then(
                    function(res) {

                        $scope.songs.push({
                            SongID: res.data.SongID,
                            Title: $scope.dataForm.Title,
                            Artist: $scope.dataForm.Artist
                        });
                        $scope.closeModal('custom-modal-1');
                        reset();
                        Alertify.success('Song successfully added!');

                        $location.path('/Songs');
                        $scope.submitted = false;

                    },
                    function(error) {
                        $scope.submitted = false;
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );
            }
            $scope.EditSubmit = function() {
                $scope.submitted = true;
                if ($scope.dataForm.Part != "" && $scope.dataForm.Content != "") {
                    if ($scope.slides.length < $scope.slideCount + 1) {
                        insertSlide();
                    }
                }
                console.log($scope.slides.length == $scope.slideCount + 1);

                $scope.slides[$scope.slideCount].PartID = $scope.dataForm.Part;
                $scope.slides[$scope.slideCount].Content = $scope.dataForm.Content;



                var data = {
                    Details: $scope.dataForm,
                    Slides: $scope.slides
                };


                SongsService.editSong(data).then(
                    function(res) {

                        // $scope.songs.push({
                        //     SongID: res.data.SongID,
                        //     Title: $scope.dataForm.Title,
                        //     Artist: $scope.dataForm.Artist
                        // });
                        getData();
                        $scope.closeModal('custom-modal-1');
                        reset();
                        Alertify.success('Song successfully edited!');

                        $location.path('/Songs');
                        $scope.submitted = false;

                    },
                    function(error) {
                        $scope.submitted = false;
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );
            }


            $scope.$watchGroup(['dataForm.Part', 'dataForm.Content'], function(data) {
                $scope.next = checkVal(data);
                $scope.check = checkVal(data);
                console.log($scope.check);
            });

            $scope.$watchGroup(['dataForm.Title', 'dataForm.Artist', 'dataForm.Genre', 'dataForm.Language'], function(data) {
                $scope.tabDetails = checkVal(data);
            });

            $scope.steps = [{
                    templateUrl: 'app/views/songs-details.html',
                    title: 'Details'
                },
                {
                    templateUrl: 'app/views/songs-slides.html',
                    title: 'Slides'
                }
            ];

            function getSong(id) {
                SongsService.getSongs(id).then(
                    function(res) {
                        $scope.song = res.data.song;
                        $scope.slides = res.data.slides;
                    },
                    function() {
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );

            }




            if (typeof $routeParams.id !== 'undefined' && $routeParams.id !== '') {
                getSong($routeParams.id);

            }
            $scope.nextPart = true;
            var xy = 0;
            $scope.getPartName = function(PartID) {

                for (var Part of $scope.Parts) {
                    if (xy === PartID) {
                        $scope.nextPart = false;
                        return;
                    } else
                    if (Part.PartID === PartID) {
                        xy = PartID;
                        $scope.nextPart = true;
                        return '[' + Part.PartName + ':]';
                    }
                }

            }

            $scope.updateButton = function(id) {

                SongsService.getSongs(id).then(
                    function(res) {
                        var song = res.data.song;
                        res.data.slides.forEach(function(data) {
                            $scope.slides.push({
                                Content: data.Content,
                                PartID: data.PartID,
                                OrderNumber: data.OrderNumber
                            });

                        });
                        $scope.OrderCount = res.data.slides.length + 1;
                        $scope.dataForm = {
                            SongID: song.SongID,
                            Title: song.Title,
                            Artist: song.Artist,
                            Language: song.Language,
                            Genre: song.Genre,
                            Part: $scope.slides[$scope.slideCount].PartID,
                            Content: $scope.slides[$scope.slideCount].Content,
                        };



                    },
                    function() {
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );


            }


            $scope.generateSlide = function(id) {
                var pptx = new PptxGenJS();
                var title = '';
                var slides = '';
                SongsService.getSongs(id).then(
                    function(res) {
                        title = res.data.song.Title.toUpperCase();
                        res.data.slides.forEach(function(data) {
                           
                            var shadowOpts = { type: 'outer', color: '000000', blur: 4, offset: 3, angle: 45, opacity: 0.6 };
                            pptx.setLayout('LAYOUT_4x3');
                            // Add a Slide, then add objects
                            var slide = pptx.addNewSlide();

                            slide.addImage({ path: 'public/images/Picture1.jpg', x: 0, y: 0, w: 10, h: 7.5 });
                            slide.addText(data.Content.toUpperCase(), { x: 0.52, y: 0.42, w: 9.06, h: 3.67, font_size: 40, font_face: 'Gill Sans MT', color: 'ffffff', bold: true, align: 'center', valign: "top", shadow: shadowOpts, glow: { color: '000000', opacity: 30, size: 8 } });

                            slide.addText(title, { x: 2.33, y: 6.25, font_size: 28, font_face: 'Arial', color: 'ffffff', italic: true, align: 'right' });




                        });
                        pptx.save(title);
                    },
                    function() {
                        Alertify.error('Error! Something went wrong with the server!');
                    }
                );


            }


            $scope.lineUpSongs = [];
            $scope.checkLineUp = function(id){
                if(typeof $cookies.getObject('lineUp') !== 'undefined'){
                    var array = $cookies.getObject('lineUp');

                    for(var x in array){
                        if(array[x] == id)
                            return true;
                    }
                    return false;
                }else{
                    return false;
                }
            }

            $scope.addLineUp = function(id){
                    
                if(typeof $cookies.getObject('lineUp') !== 'undefined'){
                    var array = $cookies.getObject('lineUp');
                    
                    array.push(id);
                    $cookies.putObject('lineUp', array); 
                }else{
                    var array = [id];
                    $cookies.putObject('lineUp', array); 
                }
        
            }

            $scope.removeLineUp = function(id, index=''){
                if(typeof $cookies.getObject('lineUp') !== 'undefined'){
                    var array = $cookies.getObject('lineUp');
                    for(var x in array){
                        if(array[x] == id){
                            delete array[x];
                            $cookies.putObject('lineUp', array); 
                            console.log($scope.lineUpSongs);
                            if(index!==''){
    
                                $scope.lineUpSongs.splice( index, 1 );

                            }
                            
                        }
                    }
                }
            }


           
            if(typeof $cookies.getObject('lineUp') !== 'undefined'){
                var array = $cookies.getObject('lineUp');
                for(var x in array){
                    console.log(array[x]);
                    SongsService.getSongs(array[x]).then(
                        function(res) {
                            var song = res.data.song;
                            $scope.lineUpSongs.push({
                               Title:song.Title,
                               Artist:song.Artist,
                               Genre:song.Genre,
                               SongID:song.SongID
                            });
                        },
                        function() {
                            Alertify.error('Error! Something went wrong with the server!');
                        }
                    );
                }
            }


            $scope.generateSlides = function() {
                var pptx = new PptxGenJS();
                var title = '';
                var slides = '';
                var array = $cookies.getObject('lineUp');
                var last =array.length;
                var count = 1;
                var generate = false;
                
                for(var x in array){
                    SongsService.getSongs(array[x]).then(
                        function(res) {
                            
                            if(typeof $cookies.getObject('slide') !== 'undefined'){
                                var array = $cookies.getObject('slide');
                                
                                array.push({
                                    title:res.data.song.Title.toUpperCase(),
                                    slides:res.data.slides
                                });
                                $cookies.putObject('slide', array); 
                            }else{
                                var array = [{
                                    title:res.data.song.Title.toUpperCase(),
                                    slides:res.data.slides
                                }];
                                $cookies.putObject('slide', array); 
                            }
                            
                                                       
                        },
                        function() {
                            Alertify.error('Error! Something went wrong with the server!');
                        }
                    );
                    count++;
                    if(count==last){
                        if(typeof $cookies.getObject('slide') !== 'undefined'){
                            var slides = $cookies.getObject('slide');
                            
                            pptx.setLayout('LAYOUT_4x3');
                            var slide = pptx.addNewSlide();
                            slide.addImage({ path: 'public/images/bg.jpg', x: 0, y: 0, w: 10, h: 7.5 });

                            for(var x in slides){
                                var title = slides[x].title
                                slides[x].slides.forEach(function(data) {
                                    var shadowOpts = { type: 'outer', color: '000000', blur: 4, offset: 3, angle: 45, opacity: 0.6 };
                                    pptx.setLayout('LAYOUT_4x3');
                                    // Add a Slide, then add objects
                                    var slide = pptx.addNewSlide();

                                    slide.addImage({ path: 'public/images/Picture1.jpg', x: 0, y: 0, w: 10, h: 7.5 });
                                    slide.addText(data.Content.toUpperCase(), { x: 0.52, y: 0.42, w: 9.06, h: 3.67, font_size: 40, font_face: 'Gill Sans MT', color: 'ffffff', bold: true, align: 'center', valign: "top", shadow: shadowOpts, glow: { color: '000000', opacity: 30, size: 8 } });

                                    slide.addText(title, { x: 2.33, y: 6.25, font_size: 28, font_face: 'Arial', color: 'ffffff', italic: true, align: 'right' });

                                    count++;
                                });
                                pptx.setLayout('LAYOUT_4x3');
                                // Add a Slide, then add objects
                                var slide = pptx.addNewSlide();
                                slide.addImage({ path: 'public/images/bg.jpg', x: 0, y: 0, w: 10, h: 7.5 });

                            }
                           

                            
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth()+1; //January is 0!

                            var yyyy = today.getFullYear();
                            if(dd<10){
                                dd='0'+dd;
                            } 
                            if(mm<10){
                                mm='0'+mm;
                            } 
                            var today = dd+'/'+mm+'/'+yyyy;
                            pptx.save(today);
                              
                           
                            
                        }

                        

                    }
                }

                

                            

                            
                            
                            
                

            }

        }

    ]);

    PPTGenerator.filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
}());