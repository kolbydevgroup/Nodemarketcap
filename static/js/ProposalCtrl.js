app.controller('ProposalCtrl', function ($scope, $http, $uibModal) {
  $scope.milestones = [];

  $scope.openModalAddMilestone = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'modalAddMilestone.html',
      controller: 'ModalAddMilestoneCtrl',
      resolve: {
        milestones: function () {
          return $scope.milestones;
        }
      }
    });
  }

  $scope.removeMilestone = function (item) {
    for (var i = 0; i < $scope.milestones.length; i++) {
      var aux = $scope.milestones[i];
      if (aux.$$hashKey == item.$$hashKey) {
        $scope.milestones.splice(i, 1);

        var count = $scope.milestones.length;
        if ($scope.milestones.length == 0) { $('#hfMilestones').val(''); }
        else { $('#hfMilestones').val(JSON.stringify($scope.milestones)); }

        break;
      }
    }

  }

  $scope.totalValueUsd = function () {
    var total = parseInt(0);
    for (var i = 0; i < $scope.milestones.length; i++) {
      var milestone = $scope.milestones[i];
      total += milestone.amountUsd;
    }
    return total;
  }

  $scope.totalValueSmart = function () {
    var total = $scope.totalValueUsd();
    return dolarInSmart(total);
  }

  $scope.totalValueBtc = function () {
    var total = $scope.totalValueSmart();
    return smartInBtc(total);
  }
});

app.controller('ProposalEditCtrl', function ($scope, $http, $uibModal) {
  $scope.viewModel = viewModel;
  $scope.milestones = $scope.viewModel.milestones;
  $('#hfMilestones').val(JSON.stringify($scope.milestones));

  $scope.openModalDeactivateProposal = function (proposalId) {
   
    var modalInstance = $uibModal.open({
      templateUrl: 'modalDeactivateProposal.html',
      controller: 'ModalDeactivateProposalCtrl',
      resolve: {
        proposalId: function () {
          return proposalId;
        }
      }
    });
  }

  $scope.changeStatusProposal = function (proposalId, status) {
    $('#changeStatusProposal').button('loading');
    var url = '/Proposal/AlterStatusProposal/?proposalId=' + proposalId + '&status=' + status;
    window.location = url;
  }

  $scope.openModalAddMilestone = function () {
    var milestone =
      {
        proposalMilestoneId: undefined,
        description: '',
        amountUsd: 0,
        amountSmart: 0,
        paid: false,
        date: undefined,
        paidDate: undefined,
        txTransaction: ''
      };

    var modalInstance = $uibModal.open({
      templateUrl: 'modalAddMilestoneAdm.html',
      controller: 'ModalAddEditMilestoneCtrl',
      resolve: {
        milestones: function () {
          return $scope.milestones;
        },
        milestone: function () {
          return milestone;
        }
      }
    });
  }

  $scope.openModalEditMilestone = function (milestone) {
    var milestoneCopy = angular.copy(milestone)
    milestoneCopy.date = new Date(milestoneCopy.date);
    milestoneCopy.paidDate = new Date(milestoneCopy.paidDate);
    var modalInstance = $uibModal.open({
      templateUrl: 'modalAddMilestoneAdm.html',
      controller: 'ModalAddEditMilestoneCtrl',
      resolve: {
        milestones: function () {
          return $scope.milestones;
        },
        milestone: function () {
          return milestoneCopy;
        }
      }
    });
  }

  $scope.removeMilestone = function (item) {
    for (var i = 0; i < $scope.milestones.length; i++) {
      var aux = $scope.milestones[i];
      if (aux.$$hashKey == item.$$hashKey) {
        $scope.milestones.splice(i, 1);

        var count = $scope.milestones.length;
        if ($scope.milestones.length == 0) { $('#hfMilestones').val(''); }
        else { $('#hfMilestones').val(JSON.stringify($scope.milestones)); }

        break;
      }
    }

  }

  $scope.totalValueUsd = function () {
    var total = parseInt(0);
    for (var i = 0; i < $scope.milestones.length; i++) {
      var milestone = $scope.milestones[i];
      total += milestone.amountUsd;
    }
    return total;
  }

  $scope.totalValueSmart = function () {
    var total = $scope.totalValueUsd();
    return dolarInSmart(total);
  }

  $scope.totalValueBtc = function () {
    var total = $scope.totalValueSmart();
    return smartInBtc(total);
  }
});

app.controller('ProposalDetailsCtrl', function ($scope, $http, $uibModal) { 

  $scope.changeStatusMilestone = function (ProposalMilestoneId) {
    $('#btnOption_' + ProposalMilestoneId).button('loading');
    var url = '/Proposal/AlterStatusMilestone/' + ProposalMilestoneId;
    window.location = url;
  }
});

app.controller('ModalAddMilestoneCtrl', function ($scope, $uibModalInstance, milestones) {

  $scope.milestone =
    {
      proposalMilestoneId: undefined,
      description: '',
      amountUsd: 0,
      amountSmart: 0,
      date: undefined
    };
  $scope.blockSave = true;

  $scope.popup1 = {
    opened: false
  };

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.milestones = milestones;

  $scope.dolarInSmart = function (value) {
    return dolarInSmart(value);
  }

  $scope.save = function () {
    $scope.milestone.amountSmart = $scope.dolarInSmart($scope.milestone.amountUsd);
    $scope.milestones.push($scope.milestone);
    $('#hfMilestones').val(JSON.stringify($scope.milestones));
    $uibModalInstance.dismiss('cancel');
  }

  $scope.enabledSave = function () {

    if ($scope.milestone.description != '' &&
      $scope.milestone.description != undefined &&
      $scope.milestone.amountUsd > 0 &&
      $scope.milestone.date != undefined) {
      $scope.blockSave = false;
    }
    else {
      $scope.blockSave = true;
    }
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

app.controller('ModalDeactivateProposalCtrl', function ($scope, $uibModalInstance, proposalId, proposalRepository) {
  $scope.blockSave = true;

  $scope.model = {
    proposalId: proposalId,
    reason: ''
  }

  $scope.save = function () {
    $scope.blockSave = true;
    proposalRepository.deactivateProposal($scope.model).$promise.then(
      function (response) {
        window.location = "/Proposal/Details/" + response.Message;
      },
      function () {
      }
    );
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.enabledSave = function () {

    if ($scope.model.reason != '' &&
      $scope.model.reason != undefined) {
      $scope.blockSave = false;
    }
    else {
      $scope.blockSave = true;
    }
  }
});

app.controller('ModalAddEditMilestoneCtrl', function ($scope, $uibModalInstance, milestones, milestone) {
  $scope.milestone = milestone;
  $scope.milestones = milestones;
  $scope.blockSave = true;
  $scope.tiposAceitosTrabalhos = ".jpeg";

  $scope.popup1 = {
    opened: false
  };

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.dolarInSmart = function (value) {
    return dolarInSmart(value);
  }

  $scope.save = function () {
    if ($scope.milestone.proposalMilestoneId != undefined) {
      for (i = 0; i < $scope.milestones.length; i++) {
        if ($scope.milestones[i].proposalMilestoneId == $scope.milestone.proposalMilestoneId) {
          $scope.milestones.splice(i, 1);
          break;
        }
      }
    }

    $scope.milestones.push($scope.milestone);
    $('#hfMilestones').val(JSON.stringify($scope.milestones));
    $uibModalInstance.dismiss('cancel');
  }

  $scope.enabledSave = function () {

    if ($scope.milestone.description != '' &&
      $scope.milestone.description != undefined &&
      $scope.milestone.amountUsd > 0 &&
      $scope.milestone.date != undefined) {
      $scope.blockSave = false;
    }
    else {
      $scope.blockSave = true;
    }
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.enabledSave();


  $scope.uploadImagem = function (files) {
    var file = files[0];
    console.log(file);
  }
});