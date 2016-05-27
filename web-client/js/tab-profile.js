tab.profile = {};

tab.profile.content = $('#tab-pofile-content');

tab.profile.load = function () {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'sys_get_login'}),
        function ( data ) {
            tab.profile.name = JSON.parse(data)['data']['uname'];
            tab.profile.showProfile( tab.profile.content, tab.profile.name );
        }
    );
}

tab.profile.showProfile = function ( block, who ) {
    $.post(
        api_address + 'api.php',
        JSON.stringify({ 'action': 'sys_get_profile'}),
        function ( data ) {
        }
    );
}
