$(document).ready(function() {
    $('#fund').DataTable( {
        "ajax": "../coinFund.json",
		"columnDefs": [
		{ "orderable": false, "targets": 0 }, {"targets": 0,	"data": [[0]], "render": function(data, type, row) {
        return '<img src="'+data+'" />';
        },
		},
		{"targets": 1,	"data": [[1]], "render": function(data, type, row) {
        return '<a href="'+data+'</a>';
        },
		},	
			{ "targets": 2, "data": [[2]], render: $.fn.dataTable.render.number( ',', '.', 2,'', '%' )},
			{ "targets": 3, "data": [[3]], render: $.fn.dataTable.render.number( ',', '.', 4,'', '' )},
			{ "targets": 4, "data": [[4]], render: $.fn.dataTable.render.number( ',', '.', 4,'', '' )},

		],	
        "order": [[ 2, "desc" ]],
		"paging": false
    } );
} );
