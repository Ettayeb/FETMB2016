angular.module('forum.controllers', [])
    .controller('AppCtrl', function($scope, $window, $timeout, user) {

        $scope.connected = user.getuser();
        $scope.logout = function() {
            user.logout();
            $window.location.reload();

        };

    })

.controller('SignUp', function($scope, $ionicModal, $timeout) {

    $ionicModal.fromTemplateUrl('templates/signupform.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });

    $scope.closeSignup = function() {
        $scope.modal.hide();
        console.log('hidden');
    };

    $scope.closeSignup();

    $scope.submit = function() {

    };

})




.controller('HomeCtrl', function($scope) {


})


.controller('ForumCtrl', function($scope, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {


        $scope.data = {};
        $http.get('http://192.168.100.42/presentation')
            .error(function() {

                alert("Vérifier votre connectivité SVP .");

            })
            .then(function(res) {

                $scope.presentations = res.data.data[0];
                id_page = $scope.presentations.id;
                $http.get('http://192.168.100.42/comments/' + id_page)
                    .error(function() {

                        alert("Vérifier votre connectivité SVP .");

                    })
                    .then(function(res) {

                        $scope.comments = res.data.data;

                    });


            });
        $scope.connected = user.getuser();
        $scope.commenter = function() {
          
          if ($scope.data.comment){
            id_user = user.getuser().id;
            data = {
                'id_user': id_user,
                'comment': $scope.data.comment,
                'id_page': id_page
            };
            $http.post('http://192.168.100.42/comment', data)
                .error(function() {
                    alert("Vérifier votre connectivité SVP .");

                })
                .then(function(res) {
                    if (res.data.data.message == 'error') {
                        alert('Vérifier votre connectivité SVP .');
                    } else {
                        $http.get('http://192.168.100.42/presentation')
                            .error(function() {

                                alert("Vérifier votre connectivité SVP .");

                            })
                            .then(function(res) {

                                $scope.presentations = res.data.data[0];
                                $http.get('http://192.168.100.42/comments/' + id_page)
                                    .error(function() {

                                        alert("Vérifier votre connectivité SVP .");

                                    })
                                    .then(function(res) {

                                        $scope.comments = res.data.data;

                                    });


                            });

                        $scope.data.comment = "";
                    }
                });
          }

        };



        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.like = function() {

            id_user = user.getuser().id;
            $http.get("http://192.168.100.42/like/" + id_page + '/' + id_user)
                .error(function(err) {
                    alert(err);
                    alert("Vérifier votre connectivité !");

                })
                .then(function() {

                    $http.get('http://192.168.100.42/presentation')
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

                            $scope.presentations = res.data.data[0];

                        });
                });
        };

        $scope.connected = user.getuser();

        $scope.requirelogin = function() {

            alert("Vous devez connecter pour effectuer cettre opération !");
            $location.path('/app/login');
        };
        $scope.bottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };



    })
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, user, $location, $window) {

        /* modal setup */
        $ionicModal.fromTemplateUrl('templates/signupform.html', {
            scope: $scope,
            animation: 'mh-slide'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeSignup = function() {
            $scope.modal.hide();
        };
        /* END modal setup */

        $scope.signupform = {};
        $scope.data = {};

        $scope.signup = function() {
            if ($scope.signupform.password != $scope.signupform.confirm_pass) {
                alert('Vérifier votre mot de passe SVP .');

            }
            user.signup($scope.signupform)
                .error(function() {
                    alert('Vérifier votre connectivité SVP .');
                })
                .then(function(res) {

                    if (res.data.data.message === 'done') {
                        alert('Merci pour votre inscription ! Vous pouvez connecter dés maintenant .');
                        $timeout(function() {
                            $scope.closeSignup();
                        }, 1000);

                    } else {
                        alert('Vérifier votre connectivité SVP .');
                    }

                });
        };
        $scope.login = function() {
            user.login($scope.data)
                .error(function() {
                    alert('Vérifier votre connectivité SVP .');
                })
                .then(function(res) {

                    if (res.data.data.message === 'done') {
                        user.saveuser(res.data.data.user);
                        $location.path('/app/home');
                        $window.location.reload();

                    } else {
                        alert('Vérifier votre données SVP .');
                    }

                });

        };



    })
    .controller('ProgramCtrl', function($scope, $stateParams) {

        $scope.data = {
            image: 'img/mercredi.png',
            jour: 'jour1',
            title: 'MERCREDI',
            link1: '#/app/program/pleniere/',
            link2: '#/app/program/business/',
            link3: '#/app/program/education/',
            link4: '#/app/program/hackathon/',
            link5: '#/app/program/masterclass/',
            link6: '#/app/program/concours/',
            title1: '<i class="icon ion-mic-c"></i>Conférences</br>plénière',
            title2: '<i class="icon ion-mic-c"></i>Conférences</br>Business',
            title3: '<i class="icon ion-mic-c"></i>Conférences</br>Education',
            title4: '<i class="icon ion-android-bulb"></i>E-learning</br>Hackathon',
            title5: '<i class="icon ion-university"></i>Masterclass',
            title6: '<i class="icon ion-ios-game-controller-b"></i>Jeu</br>concours'

        };

        $scope.mercredi = true;
        $scope.forward = function() {
            $scope.mercredi = false;
            $scope.jeudi = true;
            $scope.data = {
                image: 'img/jeudi.png',
                jour: 'jour2',
                title: 'JEUDI',
                link1: '#/app/program/business/',
                link2: '#/app/program/education/',
                link3: '#/app/program/b2b/',
                link4: '#/app/program/hackathon/',
                link5: '#/app/program/concours/',
                link6: '#/app/program/cocktail/',
                title1: '<i class="icon ion-mic-c"></i>Conférences</br>Business',
                title2: '<i class="icon ion-mic-c"></i>Conférences</br>Education',
                title3: '<i class="icon ion-person-stalker"></i>Business </br>to Business',
                title4: '<i class="icon ion-android-bulb"></i>E-learning</br>Hackathon',
                title5: '<i class="icon ion-ios-game-controller-b"></i>Jeu</br>concours',
                title6: '<i class="icon ion-fork"></i>Cocktail</br>dinatoire'

            };

        };
        $scope.back = function() {
            $scope.mercredi = true;
            $scope.jeudi = false;
            $scope.data = {
                image: 'img/mercredi.png',
                jour: 'jour1',
                title: 'MERCREDI',
                link1: '#/app/program/pleniere/',
                link2: '#/app/program/business/',
                link3: '#/app/program/education/',
                link4: '#/app/program/hackathon/',
                link5: '#/app/program/masterclass/',
                link6: '#/app/program/concours/',
                title1: '<i class="icon ion-mic-c"></i>Conférences</br>plénière',
                title2: '<i class="icon ion-mic-c"></i>Conférences</br>Business',
                title3: '<i class="icon ion-mic-c"></i>Conférences</br>Education',
                title4: '<i class="icon ion-android-bulb"></i>E-learning</br>Hackathon',
                title5: '<i class="icon ion-university"></i>Masterclass',
                title6: '<i class="icon ion-ios-game-controller-b"></i>Jeu</br>concours'

            };

        };


    })
    .controller('ConferenceCtrl', function($scope, $stateParams, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {

        $scope.data = {};
        $http.get('http://192.168.100.42/program/' + $stateParams.type + '/' + $stateParams.jour)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                if (res.data.data.length > 1) {
                    $scope.single = false;
                    $scope.data = res.data.data;
                    data = $scope.data;

                } else {
                    $scope.single = true;
                    $scope.data = res.data.data[0];
                    id_page = $scope.data.id;
                    $http.get('http://192.168.100.42/comments/' + id_page)
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res2) {

                            $scope.comments = res2.data.data;

                        });


                }

            });

        $scope.connected = user.getuser();
        $scope.commenter = function() {
            id_user = user.getuser().id;
            data = {
                'id_user': id_user,
                'comment': $scope.data.comment,
                'id_page': id_page
            };
            $http.post('http://192.168.100.42/comment', data)
                .error(function() {
                    alert("Vérifier votre connectivité SVP .");

                })
                .then(function(res) {
                    if (res.data.data.message == 'error') {
                        alert('Vérifier votre connectivité SVP .');
                    } else {
                        $http.get('http://192.168.100.42/program/' + $stateParams.type + '/' + $stateParams.jour)
                            .error(function() {

                                alert('Vérifier votre connectivité SVP .');
                            })
                            .then(function(res2) {
                                if (res2.data.data.length > 1) {
                                    $scope.single = false;
                                    $scope.data = res2.data.data;

                                } else {
                                    $scope.single = true;
                                    $scope.data = res2.data.data[0];
                                    $http.get('http://192.168.100.42/comments/' + id_page)
                                        .error(function() {

                                            alert("Vérifier votre connectivité SVP .");

                                        })
                                        .then(function(res) {

                                            $scope.comments = res.data.data;

                                        });


                                }

                            });

                        $scope.data.comment = "";
                    }
                });


        };

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.like = function() {

            id_user = user.getuser().id;
            $http.get("http://192.168.100.42/like/" + id_page + '/' + id_user)
                .error(function(err) {
                    alert(err);
                    alert("Vérifier votre connectivité !");

                })
                .then(function() {

                    $http.get('http://192.168.100.42/program/' + $stateParams.type + '/' + $stateParams.jour)
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

                            $scope.single = true;
                            $scope.data = res.data.data[0];

                        });
                });
        };

        $scope.requirelogin = function() {

            alert("Vous devez connecter pour effectuer cettre opération !");
            $location.path('/app/login');
        };
        $scope.bottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };


        $scope.share = function() {
            //'http://192.168.100.42/uploads/' + data.image
            window.plugins.socialsharing.share(data.titre, 'Forum E-learning Tunisie 2016 Conférences : ', 'http://192.168.100.42/uploads/' + data.image, 'http://forumelearningtunisie.com');

        };



    });