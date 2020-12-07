const stubuAPIUrl = require('../stubuapi').default.api
export default function ({ $axios, redirect }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            common: {
                Authorization: `Bearer ${localStorage["access_token"]}`,
            }
        }
    })
    api.onError(error => {
        console.log(error.response)
        if (error.response) {
            // Token 過期
            if (error.response.data.error == "invalid_grant") {
                return redirect("/login");
            } else {
                alert(error.response.data.error_description || error.response.data);
            }
        }
    })



    // Set baseURL to something different
    console.log(stubuAPIUrl)
    api.setBaseURL(stubuAPIUrl)

    // Inject to context as $api
    inject('api', api)
}