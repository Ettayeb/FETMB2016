angular.module('forum.controllers2', [])
    .controller('ConfCtrl', function($scope, $stateParams, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {

        $http.get('http://192.168.100.42/conf/' + $stateParams.id)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;
                data = $scope.data;
                id_page = $stateParams.id;
                $http.get('http://192.168.100.42/comments/' + id_page)
                    .error(function() {

                        alert("Vérifier votre connectivité SVP .");

                    })
                    .then(function(res2) {

                        $scope.comments = res2.data.data;

                    });


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
                        $http.get('http://192.168.100.42/conf/' + $stateParams.id)
                            .error(function() {

                                alert('Vérifier votre connectivité SVP .');
                            })
                            .then(function(res2) {
                                $scope.data = res2.data.data;
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

                    $http.get('http://192.168.100.42/conf/' + $stateParams.id)
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

                            $scope.data = res.data.data;

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


    })
    .controller('NouvCtrl', function($scope, $stateParams, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {

        $http.get('http://192.168.100.42/nouveautes/' + $stateParams.type)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;
                id_page = res.data.data[0].id;
                titres = '';
                data = $scope.data[0];
                for (index = 0; index <= $scope.data.length - 1; index++) {
                    titres = titres + ' ' + $scope.data[index].titre;
                }
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
                        $http.get('http://192.168.100.42/nouveautes/' + $stateParams.type)
                            .error(function() {

                                alert('Vérifier votre connectivité SVP .');
                            })
                            .then(function(res) {
                                $scope.data = res.data.data;
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

                    $http.get('http://192.168.100.42/nouveautes/' + $stateParams.type)
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

                            $scope.data = res.data.data;

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
            window.plugins.socialsharing.share(titres, 'Forum E-learning Tunisie 2016 Nouveautés : ', 'http://192.168.100.42/uploads/' + data.image, 'http://www.forumelearningtunisie.com/nouveautes-2016/');

        };




    })

.controller('SpeakersCtrl', function($scope, $http) {

        $http.get('http://192.168.100.42/speakers')
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;

            });


    })
    .controller('SpeakerCtrl', function($scope, $http, $stateParams, user, $ionicHistory, $location) {

        $http.get('http://192.168.100.42/speakers/' + $stateParams.id)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;
                data = $scope.data;
            });
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.like = function() {
            id_page = $stateParams.id;
            id_user = user.getuser().id;
            $http.get("http://192.168.100.42/like/" + id_page + '/' + id_user)
                .error(function() {
                    alert("Vérifier votre connectivité !");

                })
                .then(function() {

                    $http.get('http://192.168.100.42/speakers/' + $stateParams.id)
                        .error(function() {

                            alert('Vérifier votre connectivité SVP .');
                        })
                        .then(function(res) {
                            $scope.data = res.data.data;

                        });
                });
        };

        $scope.connected = user.getuser();

        $scope.requirelogin = function() {

            alert("Vous devez connecter pour effectuer cettre opération !");
            $location.path('/app/login');
        };
        $scope.GotoLink = function(url) {
            window.open(url, '_system');
        };

        $scope.share = function() {
            //'http://192.168.100.42/uploads/' + data.image
            window.plugins.socialsharing.share(data.titre + ' : ' + data.lien, 'Forum E-learning Tunisie 2016 Speakers', 'http://192.168.100.42/uploads/' + data.image, 'http://forumelearningtunisie.com');

        };



    })

.controller('ExposantsCtrl', function($scope, $http) {

        $http.get('http://192.168.100.42/exposants')
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;

            });


    })
    .controller('ExposantCtrl', function($scope, $http, $stateParams, user, $ionicHistory, $location) {

        $http.get('http://192.168.100.42/exposants/' + $stateParams.id)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;
                data = $scope.data;
            });
        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };
        $scope.like = function() {
            id_page = $stateParams.id;
            id_user = user.getuser().id;
            $http.get("http://192.168.100.42/like/" + id_page + '/' + id_user)
                .error(function() {
                    alert("Vérifier votre connectivité !");

                })
                .then(function() {

                    $http.get('http://192.168.100.42/exposants/' + $stateParams.id)
                        .error(function() {

                            alert('Vérifier votre connectivité SVP .');
                        })
                        .then(function(res) {
                            $scope.data = res.data.data;

                        });
                });
        };

        $scope.connected = user.getuser();

        $scope.requirelogin = function() {

            alert("Vous devez connecter pour effectuer cettre opération !");
            $location.path('/app/login');
        };
        $scope.GotoLink = function(url) {
            window.open(url, '_system');
        };

        $scope.share = function() {
            //'http://192.168.100.42/uploads/' + data.image
            window.plugins.socialsharing.share(data.titre + ' : ' + data.lien, 'Forum E-learning Tunisie 2016 Exposants', 'http://192.168.100.42/uploads/' + data.image, 'http://forumelearningtunisie.com');

        };



    })
    .controller('ExpoCtrl', function($scope, $stateParams, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {

        $http.get('http://192.168.100.42/exposition/')
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data[0];
                id_page = $scope.data.id;
                data = $scope.data;
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
                        $http.get('http://192.168.100.42/exposition')
                            .error(function() {

                                alert('Vérifier votre connectivité SVP .');
                            })
                            .then(function(res) {
                                $scope.data = res.data.data[0];
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

                    $http.get('http://192.168.100.42/exposition')
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

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
            window.plugins.socialsharing.share(titres, "Forum E-learning Tunisie 2016 Plan de l'exposition : ", 'http://192.168.100.42/uploads/' + data.date, 'www.forumelearningtunisie.com/plan-de-lexposition');

        };




    })


    .controller('InfoCtrl', function($scope, $stateParams, $http, $ionicHistory, user, $window, $location, $ionicScrollDelegate) {

        $http.get('http://192.168.100.42/infos/' + $stateParams.type)
            .error(function() {

                alert('Vérifier votre connectivité SVP .');
            })
            .then(function(res) {
                $scope.data = res.data.data;
                id_page = res.data.data[0].id;
                titres = '';
                data = $scope.data[0];
                for (index = 0; index <= $scope.data.length - 1; index++) {
                    titres = titres + ' ' + $scope.data[index].titre;
                }
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
                        $http.get('http://192.168.100.42/infos/' + $stateParams.type)
                            .error(function() {

                                alert('Vérifier votre connectivité SVP .');
                            })
                            .then(function(res) {
                                $scope.data = res.data.data;
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

                    $http.get('http://192.168.100.42/nouveautes/' + $stateParams.type)
                        .error(function() {

                            alert("Vérifier votre connectivité SVP .");

                        })
                        .then(function(res) {

                            $scope.data = res.data.data;

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
            window.plugins.socialsharing.share(titres, 'Forum E-learning Tunisie 2016 Nouveautés : ', 'http://192.168.100.42/uploads/' + data.image, 'http://www.forumelearningtunisie.com/nouveautes-2016/');

        };




    });
