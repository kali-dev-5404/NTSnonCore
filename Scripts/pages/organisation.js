$(document).ready(function () {

    const table = $('#organisationTable').DataTable({
        paging: true,
        info: false,
        lengthChange: false,
        pageLength: 10,
        ordering: true,
        dom: 'rtp', // remove default search
        language: {
            paginate: {
                previous: '‹',
                next: '›'
            }
        }
    });

    // Custom search input
    $('#orgSearch').on('keyup', function () {
        table.search(this.value).draw();
    });

});
