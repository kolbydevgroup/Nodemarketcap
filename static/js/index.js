$(document).ready(function() {
    $('#stats').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "/retrieve_server_data",
		"columnDefs": [
		{ "orderable": false, "targets": 0 }, {"targets": 0,	"data": [[0]], "render": function(data, type, row) {
        return '<img src="/static/imgs/coins16/'+data+'.png" />';
        },
		},
		{"targets": 1,	"data": [[1]], "render": function(data, type, row) {
        return '<a href="'+data+'</a>';
        },
		},	
			{ "targets": 7, "data": [[7]], render: $.fn.dataTable.render.number( ',', '.', 4,'$' ) },
			  { "targets": 8, "data": [[8]], render: $.fn.dataTable.render.number( ',', '.', 4,'$' ) },
		  { "targets": 9, "data": [[9]], render: $.fn.dataTable.render.number( ',', '.', 4,'$' ) },
			{ "targets": 3, "data": [[3]], render: $.fn.dataTable.render.number( ',', '.', 4,'$' ) },
			{ "targets": 2, "data": [[2]], render: $.fn.dataTable.render.number( ',', '.', 4,'', '%' )},
			{ "targets": 4, "data": [[4]], render: $.fn.dataTable.render.number( ',', '.', 4,'', '%' )	}
		],	
        "order": [[ 2, "desc" ]],
		"aLengthMenu": [[10, 25, 50, 100, -1], [ 10, 25, 50, 100, "All"]],
		"pageLength": 50		
    } );
} );
