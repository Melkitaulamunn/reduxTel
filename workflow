dependencies:

    - json server
        -install, db.json, run
    - axios
        -install
        -instance
            api:create baseUrl
            urls
    - state management 
        - redux
        - react-redux
    - react-router-dom

workflow

    - UI: bootstrap
    -generik component for succes, error and confirmation
    -header
        whichpage, back arrow
    -fetch actions in app.js 
        useEffect, useDispatch 
        validation 
    - categoryactions
        -category list
            - store subscription
            - fetch categories
            - add category
                - logic and styling
                - input 
                    state, value, onclick
                    validation
                    general modal for errors
                    post to api
                    dispatch to store
            - category actions X
    peoplelist
        search input
            value
            onlcik
        people container
            - category validation
            -table