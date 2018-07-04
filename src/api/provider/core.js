export default class CoreProvider {
    // const CURRENT_BASE_KEY = 'currentBaseConfig';
    // let _DatabaseStructure=new DatabaseStructure();
    // let database = null;
    // let connection = {};

    constructor(connection)
    {
        this.connection=connection;
        this.DatabaseStructure={};
        // connection.login
    }
    render()
    {
        //
        return 123;
    }
    setDatabase()
    {

    }
    getDatabase()
    {
        return 'default';
    }
    hashCode(s)
    {
        return s.split('').reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }
    makeQueryId () {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    isAuthorized()
    {

    }

    getConnection()
    {
        return this.connection;
    }
    getPassword()
    {
        return this.connection.password;
    }
    getLogin()
    {
        return this.connection.login;
    }
    getHost()
    {
        return this.connection.host;
    }
    isTabixServer()
    {
        return false;
    }
    makeSqlQuery (sql,format)
    {
        let query = '';


        if (format !== false) {
            format = (format || ' FoRmAt JSON');
            if (format == 'null') {
                format = '';
            }
            query = sql + '\n\n' + format;
        } else {
            query = sql;
        }
        return query;
    }
    request(q)
    {
        return fetch(q)
            .then(function(response) {
                let contentType = response.headers.get('content-type');
                if (contentType.includes('text/tab-separated-values') && response.status == 200 &&  response.statusText.toLowerCase() == 'ok' )
                {
                    // if insert
                    return 'OK';
                }
                if (contentType.includes('text/plain') && response.status == 200 &&  response.statusText.toLowerCase() == 'ok' )
                {
                    // if create table && drop table
                    return 'OK';
                }
                if (contentType && contentType.includes('application/json') && response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                } else {
                    return response.text().then(Promise.reject.bind(Promise));
                }
            })
            .then(function(response) {
                if (response==='OK') {
                    return 'OK';
                }
                return response.json();
            },
            function (responseBody) {
                return Promise.reject(responseBody);
            }
            );
    }


}