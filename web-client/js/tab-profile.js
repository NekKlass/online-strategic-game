tab.profile = {};

tab.profile.load = function () {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'sys_get_login'}),
        function ( data ) {
            tab.profile.name = JSON.parse(data)['data']['uname'];
        }
    );
}
