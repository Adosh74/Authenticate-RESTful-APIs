import * as Controller from "../controllers/crm.Controllers.js"
import * as UserControllers from './../controllers/user.controllers.js'

const routes = (app) => {
    /// end-point to get all contact //
    app.route('/contact', )
        .get((req, res, next) => {
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type ${req.method}`);
                next()
        }, UserControllers.loginRequired, Controller.getContact)

    /// end-point to create new contact //
        .post(UserControllers.loginRequired, Controller.addContact)

    app.route('/contact/:contactId')

    /// end-point to update contact //
        .put(UserControllers.loginRequired, Controller.update)

    /// end-point to delete contact //
        .delete(UserControllers.loginRequired, Controller.deleteContact)

    /// end-point to get specific contact //
        .get(UserControllers.loginRequired, Controller.getById)

    // registration route
    app.route('/auth/register', UserControllers.register)
        .post(UserControllers.register);

    // login route
    app.route('/login')
        .post(UserControllers.login);
}

export default routes;

