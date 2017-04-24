// Compiled using typings@0.6.8
// Source: node_modules/controllers.ts/index.d.ts
declare module 'controllers.ts/metadata/ParamMetadata' {
	/**
	 * Controller metadata used to storage information about registered parameters.
	 */
	export interface ParamMetadata {
	    /**
	     * Object on which's method's parameter this parameter is attached.
	     */
	    object: any;
	    /**
	     * Method on which's parameter is attached.
	     */
	    method: string;
	    /**
	     * Index (# number) of the parameter in the method signature.
	     */
	    index: number;
	    /**
	     * Parameter type.
	     */
	    type: ParamType;
	    /**
	     * Parameter name.
	     */
	    name?: string;
	    /**
	     * Parameter format.
	     */
	    format?: any;
	    /**
	     * Specifies if parameter should be parsed as json or not.
	     */
	    parseJson: boolean;
	    /**
	     * Indicates if this parameter is required or not
	     */
	    isRequired: boolean;
	}
	/**
	 * Action parameter types.
	 */
	export enum ParamType {
	    BODY = 1,
	    QUERY = 2,
	    BODY_PARAM = 3,
	    PARAM = 4,
	    COOKIE = 5,
	    REQUEST = 6,
	    RESPONSE = 7,
	}
	/**
	 * Extra parameters set to the parameter.
	 */
	export interface ParamOptions {
	    /**
	     * If set to true then parameter will be required.
	     */
	    required?: boolean;
	    /**
	     * If set to true then parameter will be parsed to json.
	     */
	    parseJson?: boolean;
	}

}
declare module 'controllers.ts/interceptor/ResponseInterceptorInterface' {
	/**
	 * Classes that intercepts response result must implement this interface.
	 */
	export interface ResponseInterceptorInterface {
	    /**
	     * Called before response.send is being called. The data passed to method is the data passed to .send method.
	     * Note that you must return same (or changed) data and it will be passed to .send method.
	     */
	    onSend?(data: any, request: any, response: any): any;
	    /**
	     * Called before response.json is being called. The data passed to method is the data passed to .json method.
	     * Note that you must return same (or changed) data and it will be passed to .json method.
	     */
	    onJson?(data: any, request: any, response: any): any;
	}

}
declare module 'controllers.ts/ResultHandleOptions' {
	import { ResponseInterceptorInterface } from 'controllers.ts/interceptor/ResponseInterceptorInterface';
	/**
	 * Options used to send to framework result handlers.
	 */
	export interface ResultHandleOptions {
	    /**
	     * User request.
	     */
	    request: any;
	    /**
	     * User response.
	     */
	    response: any;
	    /**
	     * Content to be sent in result.
	     */
	    content: any;
	    /**
	     * Indicates if response result should be handled as json.
	     */
	    asJson: boolean;
	    /**
	     * Status code to be set in the response result in the case if response success.
	     */
	    successHttpCode: number;
	    /**
	     * Status code to be set in the response result in the case if response fail.
	     */
	    errorHttpCode: number;
	    /**
	     * If set then redirection will work on the given address.
	     */
	    redirect: string;
	    /**
	     * Interceptors used to catch (and do something) with response result before it will be sent.
	     */
	    interceptors: ResponseInterceptorInterface[];
	    /**
	     * Custom response headers.
	     */
	    headers: {
	        name: string;
	        value: string;
	    }[];
	    /**
	     * Template to be rendered.
	     */
	    renderedTemplate: string;
	}

}
declare module 'controllers.ts/server/Server' {
	import { ParamType } from 'controllers.ts/metadata/ParamMetadata';
	import { ResultHandleOptions } from 'controllers.ts/ResultHandleOptions';
	/**
	 * Abstract layer to organize controllers integration with different http server implementations.
	 */
	export interface Server {
	    /**
	     * Registers action in the server framework.
	     *
	     * @param route URI path to be registered (for example /users/:id/photos)
	     * @param actionType HTTP action to be performed on registered path (GET, POST, etc.)
	     * @param executeCallback Function to be called when request comes on the given route with the given action
	     */
	    registerAction(route: string | RegExp, actionType: string, executeCallback: (request: any, response: any) => any): void;
	    /**
	     * Gets param from the request.
	     *
	     * @param request Request made by a user
	     * @param paramName Parameter name
	     * @param paramType Parameter type
	     */
	    getParamFromRequest(request: any, paramName: string, paramType: ParamType): void;
	    /**
	     * Defines an algorithm of how to handle error during executing controller action.
	     *
	     * @param options Handling performs on these options
	     */
	    handleError(options: ResultHandleOptions): void;
	    /**
	     * Defines an algorithm of how to handle success result of executing controller action.
	     *
	     * @param options Handling performs on these options
	     */
	    handleSuccess(options: ResultHandleOptions): void;
	}

}
declare module 'controllers.ts/metadata/ActionMetadata' {
	/**
	 * Action metadata used to storage information about registered action.
	 */
	export interface ActionMetadata {
	    /**
	     * Route to be registered for the action.
	     */
	    route: string | RegExp;
	    /**
	     * Object on which's method this action is attached.
	     */
	    object: any;
	    /**
	     * Object's method that will be executed on this action.
	     */
	    method: string;
	    /**
	     * Action type represents http method used for the registered route. Can be one of the value defined in ActionTypes
	     * class.
	     */
	    type: string;
	    /**
	     * Additional action options.
	     */
	    options: ActionOptions;
	}
	/**
	 * Extra that can be set to action.
	 */
	export interface ActionOptions {
	    /**
	     * If set to true then response will be forced to json (serialized and application/json content-type will be used).
	     */
	    jsonResponse?: boolean;
	    /**
	     * If set to true then response will be forced to simple string text response.
	     */
	    textResponse?: boolean;
	}
	/**
	 * All action types that can be used for the controller method.
	 */
	export class ActionType {
	    static CHECKOUT: string;
	    static CONNECT: string;
	    static COPY: string;
	    static DELETE: string;
	    static GET: string;
	    static HEAD: string;
	    static LOCK: string;
	    static MERGE: string;
	    static MKACTIVITY: string;
	    static MKCOL: string;
	    static MOVE: string;
	    static M_SEARCH: string;
	    static NOTIFY: string;
	    static OPTIONS: string;
	    static PATCH: string;
	    static POST: string;
	    static PROPFIND: string;
	    static PROPPATCH: string;
	    static PURGE: string;
	    static PUT: string;
	    static REPORT: string;
	    static SEARCH: string;
	    static SUBSCRIBE: string;
	    static TRACE: string;
	    static UNLOCK: string;
	    static UNSUBSCRIBE: string;
	}

}
declare module 'controllers.ts/metadata/ControllerMetadata' {
	/**
	 * Controller metadata used to storage information about registered controller.
	 */
	export interface ControllerMetadata {
	    /**
	     * Base route for all actions registered in this controller.
	     */
	    route: string;
	    /**
	     * Indicates object which is used by this controller.
	     */
	    object: Function;
	    /**
	     * Instance of the object that is used to call controller methods on.
	     */
	    instance?: Object;
	    /**
	     * Controller type. Can be default, or json-typed. Can be one of the value defined in ControllerType class.
	     */
	    type: number;
	}
	/**
	 * List of controller types.
	 */
	export enum ControllerType {
	    /**
	     * Default controller type.
	     */
	    DEFAULT = 0,
	    /**
	     * JSON controller type.
	     */
	    JSON = 1,
	}

}
declare module 'controllers.ts/metadata/ResponsePropertyMetadata' {
	/**
	 * Controller metadata used to storage information about different response properties.
	 */
	export interface ResponsePropertyMetadata {
	    /**
	     * Object on which's method decorator is set.
	     */
	    object: any;
	    /**
	     * Method on which decorator is set.
	     */
	    method: string;
	    /**
	     * Property type. See ResponsePropertyMetadataType for possible values.
	     */
	    type: number;
	    /**
	     * Property value. Can be status code, content-type, header name, template name, etc.
	     */
	    value: any;
	    /**
	     * Secondary property value. Can be header value for example.
	     */
	    value2?: any;
	}
	export enum ResponsePropertyType {
	    SUCCESS_CODE = 1,
	    ERROR_CODE = 2,
	    CONTENT_TYPE = 3,
	    HEADER = 4,
	    RENDERED_TEMPLATE = 5,
	    REDIRECT = 6,
	    LOCATION = 7,
	}

}
declare module 'controllers.ts/metadata/ResponseInterceptorMetadata' {
	import { ResponseInterceptorInterface } from 'controllers.ts/interceptor/ResponseInterceptorInterface';
	/**
	 * Metadata used to storage information about registered request interceptors.
	 */
	export interface ResponseInterceptorMetadata {
	    /**
	     * Object class of the response interceptor.
	     */
	    object: Function;
	    /**
	     * Response interceptor instance.
	     */
	    instance?: ResponseInterceptorInterface;
	    /**
	     * Priority of the response interceptor.
	     */
	    priority: number;
	}

}
declare module 'controllers.ts/metadata/MetadataStorage' {
	import { ControllerMetadata } from 'controllers.ts/metadata/ControllerMetadata';
	import { ActionMetadata } from 'controllers.ts/metadata/ActionMetadata';
	import { ParamMetadata } from 'controllers.ts/metadata/ParamMetadata';
	import { ResponsePropertyMetadata } from 'controllers.ts/metadata/ResponsePropertyMetadata';
	import { ResponseInterceptorMetadata } from 'controllers.ts/metadata/ResponseInterceptorMetadata';
	/**
	 * Storage all controllers metadata.
	 */
	export class MetadataStorage {
	    private _controllerMetadatas;
	    private _responseInterceptorMetadatas;
	    private _actionMetadatas;
	    private _paramMetadatas;
	    private _responsePropertyMetadatas;
	    controllerMetadatas: ControllerMetadata[];
	    actionMetadatas: ActionMetadata[];
	    paramMetadatas: ParamMetadata[];
	    responsePropertyMetadatas: ResponsePropertyMetadata[];
	    responseInterceptorMetadatas: ResponseInterceptorMetadata[];
	    addResponsePropertyMetadata(metadata: ResponsePropertyMetadata): void;
	    addControllerMetadata(metadata: ControllerMetadata): void;
	    addResponseInterceptorMetadata(metadata: ResponseInterceptorMetadata): void;
	    addActionMetadata(metadata: ActionMetadata): void;
	    addParamMetadata(metadata: ParamMetadata): void;
	    findControllerMetadatasForClasses(controllerClasses: Function[]): ControllerMetadata[];
	    findActionMetadatasForControllerMetadata(controllerMetadata: ControllerMetadata): ActionMetadata[];
	    findParamMetadatasForControllerAndActionMetadata(controllerMetadata: ControllerMetadata, actionMetadata: ActionMetadata): ParamMetadata[];
	    findResponsePropertyMetadatasForControllerAndActionMetadata(controllerMetadata: ControllerMetadata, actionMetadata: ActionMetadata): ResponsePropertyMetadata[];
	}
	/**
	 * Default metadata storage is used as singleton and can be used to storage all metadatas.
	 */
	export let defaultMetadataStorage: MetadataStorage;

}
declare module 'controllers.ts/Utils' {
	/**
	 * Common controller utilities.
	 */
	/** @internal */
	export class Utils {
	    /**
	     * Merges two objects.
	     *
	     * @param obj1 First object to be merged
	     * @param obj2 Second object to be merged
	     * @returns Merged object
	     */
	    static merge(obj1: any, obj2: any): any;
	    /**
	     * Checks if given object is possibly a Promise object.
	     *
	     * @param object Object to be checked
	     * @returns True if given object is a possible Promise, false otherwise
	     */
	    static isPromise(object: any): boolean;
	}

}
declare module 'controllers.ts/error/http/HttpError' {
	/**
	 * Used to throw Http errors.
	 */
	export class HttpError extends Error {
	    httpCode: number;
	    message: string;
	    constructor(httpCode: number, message?: string);
	}

}
declare module 'controllers.ts/error/http/BadRequestError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 400 HTTP error.
	 */
	export class BadRequestError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/error/ParameterRequiredError' {
	import { BadRequestError } from 'controllers.ts/error/http/BadRequestError';
	/**
	 * Caused when parameter is required, but is not specified by a user.
	 */
	export class ParameterRequiredError extends BadRequestError {
	    name: string;
	    constructor(url: string, method: string, parameterName: string);
	}

}
declare module 'controllers.ts/error/BodyRequiredError' {
	import { BadRequestError } from 'controllers.ts/error/http/BadRequestError';
	/**
	 * Caused when body is required, but not given in the user request.
	 */
	export class BodyRequiredError extends BadRequestError {
	    name: string;
	    constructor(url: string, method: string);
	}

}
declare module 'controllers.ts/error/ParameterParseJsonError' {
	import { BadRequestError } from 'controllers.ts/error/http/BadRequestError';
	/**
	 * Caused when user parameter is given, but is invalid and cannot be parsed.
	 */
	export class ParameterParseJsonError extends BadRequestError {
	    name: string;
	    constructor(parameterName: string, value: any);
	}

}
declare module 'controllers.ts/ParamHandler' {
	import { ParamMetadata } from 'controllers.ts/metadata/ParamMetadata';
	import { Server } from 'controllers.ts/server/Server';
	/**
	 * Helps to handle parameters.
	 */
	export class ParamHandler {
	    private framework;
	    constructor(framework: Server);
	    handleParam(request: any, response: any, param: ParamMetadata): any;
	    private handleParamFormat(value, paramMetadata);
	    private parseValue(value, paramMetadata);
	}

}
declare module 'controllers.ts/ErrorHandlers' {
	/**
	 * Default json error handler. When controller action produces an error, it transforms this error into desired result
	 * that will be returned to a user. Applies to json responses.
	 *
	 * @param error Error to be handled
	 * @param isDebug Indicates if debug mode is enabled or not. In debug mode some extra information will be exposed
	 * @param errorOverridingMap Special data map that is used to override any property of the handled result.
	 * @returns Transformed error.
	 */
	export function jsonErrorHandler(error: any, isDebug: boolean, errorOverridingMap: any): any;
	/**
	 * Default error handler. When controller action produces an error, it transforms this error into desired result
	 * that will be returned to a user. Applies to regular responses.
	 *
	 * @param error Error to be handled
	 * @returns Transformed error.
	 */
	export function defaultErrorHandler(error: any): any;

}
declare module 'controllers.ts/ControllerRunner' {
	import { Server } from 'controllers.ts/server/Server';
	import { MetadataStorage } from 'controllers.ts/metadata/MetadataStorage';
	import { ParamHandler } from 'controllers.ts/ParamHandler';
	export type Container = {
	    get(someClass: any): any;
	};
	export type JsonErrorHandlerFunction = (error: any, isDebug: boolean, errorOverridingMap: any) => any;
	export type DefaultErrorHandlerFunction = (error: any) => any;
	/**
	 * Registers controllers and actions in the given server framework.
	 */
	export class ControllerRunner {
	    private framework;
	    errorOverridingMap: Object;
	    private _container;
	    private _metadataStorage;
	    private _paramHandler;
	    private _isLogErrorsEnabled;
	    private _isStackTraceEnabled;
	    private _jsonErrorHandler;
	    private _defaultErrorHandler;
	    private requireAll;
	    constructor(framework: Server);
	    /**
	     * Sets a container that can be used in your controllers. This allows you to inject services in your
	     * controllers.
	     */
	    container: Container;
	    /**
	     * Enables console.logging of errors if error occur in handled result.
	     *
	     * @param isEnabled
	     */
	    isLogErrorsEnabled: boolean;
	    /**
	     * Enables stack trace output if error occur in handled result.
	     *
	     * @param isEnabled
	     */
	    isStackTraceEnabled: boolean;
	    /**
	     * Sets custom json error handler.
	     *
	     * @param handler
	     */
	    jsonErrorHandler: JsonErrorHandlerFunction;
	    /**
	     * Sets custom error handler.
	     *
	     * @param handler
	     */
	    defaultErrorHandler: DefaultErrorHandlerFunction;
	    /**
	     * Sets param handler.
	     *
	     * @param handler
	     */
	    paramHandler: ParamHandler;
	    /**
	     * Sets metadata storage.
	     *
	     * @param metadataStorage
	     */
	    metadataStorage: MetadataStorage;
	    /**
	     * Loads all controllers from the given directory
	     *
	     * @param directory Directory where from load controllers
	     * @param recursive Indicates if controllers are in nested directories and thy must be loaded tooo
	     * @param filter Regxep to filter speficif files to load
	     * @param excludeDirs Regxep to exclude some files
	     * @see https://www.npmjs.com/package/require-all
	     */
	    loadFiles(directory: string, recursive?: boolean, filter?: RegExp, excludeDirs?: RegExp): void;
	    /**
	     * Registers all loaded to the metadata storage controllers and their actions.
	     */
	    registerAllActions(): ControllerRunner;
	    /**
	     * Registers actions from the given controllers.
	     */
	    registerActions(classes: Function[]): ControllerRunner;
	    private registerControllerActions(controllerMetadatas);
	    private registerAction(controller, action, responseProperties, params, interceptorMetadatas);
	    private buildActionPath(controller, action);
	    private handleAction(request, response, controllerMetadata, actionMetadata, responsePropertyMetadatas, paramMetadatas, interceptorMetadatas);
	    private getControllerInstance(metadata);
	    private getInterceptorInstancesFromMetadatas(interceptorMetadatas);
	    private getResponseInterceptorInstance(metadata);
	    private isActionMustReturnJson(controllerType, actionOptions);
	    private handleResult(result, options);
	    private handleError(error, options);
	    /**
	     * Handles response error.
	     *
	     * @param error Error to be handled
	     * @param isJson Indicates if response is json-typed or not
	     * @returns {any}
	     */
	    private processErrorWithErrorHandler(error, isJson);
	}

}
declare module 'controllers.ts/decorator/Controllers' {
	/**
	 * Defines a class as a controller. All methods with special decorators will be registered as controller actions.
	 * Controller actions are executed when request to their routes comes.
	 *
	 * @param baseRoute Extra path you can apply as a base route to all controller actions
	 */
	export function Controller(baseRoute?: string): (object: Function) => void;
	/**
	 * Defines a class as a JSON controller. If JSON controller is used, then all controller actions will return
	 * a serialized json data, and its response content-type always will be application/json.
	 *
	 * @param baseRoute Extra path you can apply as a base route to all controller actions
	 */
	export function JsonController(baseRoute?: string): (object: Function) => void;

}
declare module 'controllers.ts/decorator/Decorators' {
	/**
	 * Defines a class which will intercept all response to be sent to the client. Using such classes gives ability to
	 * change content of the response (both success and error) on-the-fly. Classes that uses this decorator must
	 * implement ResponseInterceptorInterface.
	 *
	 * @param priority Special priority to be used to define order of interceptors to be executed
	 */
	export function ResponseInterceptor(priority?: number): (object: Function) => void;
	/**
	 * Annotation must be set to controller action and given to it code will be used as HTTP Status Code in the case
	 * if response result is success.
	 */
	export function HttpCode(code: number): (object: Object, methodName: string) => void;
	/**
	 * Annotation must be set to controller action and given content-type will be set to response.
	 */
	export function ContentType(type: string): (object: Object, methodName: string) => void;
	/**
	 * Annotation must be set to controller action and given content-type will be set to response.
	 */
	export function Header(name: string, value: string): (object: Object, methodName: string) => void;
	/**
	 * Sets Location header with given value to the response.
	 */
	export function Location(value: string): (object: Object, methodName: string) => void;
	/**
	 * Sets Redirect header with given value to the response.
	 */
	export function Redirect(value: string): (object: Object, methodName: string) => void;
	/**
	 * Specifies a template to be rendered by controller.
	 */
	export function Render(template: string): (object: Object, methodName: string) => void;

}
declare module 'controllers.ts/decorator/Methods' {
	import { ActionOptions } from 'controllers.ts/metadata/ActionMetadata';
	/**
	 * Registers an action to be executed when GET request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Get(route?: RegExp, options?: ActionOptions): Function;
	export function Get(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when POST request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Post(route?: RegExp, options?: ActionOptions): Function;
	export function Post(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when PUT request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Put(route?: RegExp, options?: ActionOptions): Function;
	export function Put(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when PATCH request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Patch(route?: RegExp, options?: ActionOptions): Function;
	export function Patch(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when DELETE request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Delete(route?: RegExp, options?: ActionOptions): Function;
	export function Delete(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when HEAD request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Head(route?: RegExp, options?: ActionOptions): Function;
	export function Head(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when OPTIONS request comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Options(route?: RegExp, options?: ActionOptions): Function;
	export function Options(route?: string, options?: ActionOptions): Function;
	/**
	 * Registers an action to be executed when request with specified method comes on a given route.
	 * Applied to controller class methods.
	 *
	 * @param method Http method to be registered. All avalible http methods are listed in ActionType class
	 * @param route When request comes to this route this action will be executed
	 * @param options Extra action options to be applied
	 */
	export function Method(method: string, route?: RegExp, options?: ActionOptions): Function;
	export function Method(method: string, route?: string, options?: ActionOptions): Function;

}
declare module 'controllers.ts/decorator/Params' {
	import { ParamOptions } from 'controllers.ts/metadata/ParamMetadata';
	/**
	 * This decorator allows to inject a Request object to the controller action parameter. After that you can fully use
	 * Request object in your action method. Applied to class method parameters.
	 */
	export function Req(): (object: Object, methodName: string, index: number) => void;
	/**
	 * This decorator allows to inject a Response object to the controller action parameter. After that you can fully use
	 * Response object in your action method. Applied to class method parameters.
	 */
	export function Res(): (object: Object, methodName: string, index: number) => void;
	/**
	 * This decorator allows to inject a request body value to the controller action parameter.
	 * Applied to class method parameters.
	 *
	 * @param options Extra parameter options
	 */
	export function Body(options: ParamOptions): Function;
	export function Body(required?: boolean, parseJson?: boolean): Function;
	/**
	 * This decorator allows to inject a route parameter value to the controller action parameter.
	 * Applied to class method parameters.
	 *
	 * @param name Parameter name
	 * @param options Extra parameter options
	 */
	export function Param(name: string, options: ParamOptions): Function;
	export function Param(name: string, required?: boolean, parseJson?: boolean): Function;
	/**
	 * This decorator allows to inject a query parameter value to the controller action parameter.
	 * Applied to class method parameters.
	 *
	 * @param name Parameter name
	 * @param options Extra parameter options
	 */
	export function QueryParam(name: string, options: ParamOptions): Function;
	export function QueryParam(name: string, required?: boolean, parseJson?: boolean): Function;
	/**
	 * This decorator allows to inject a request body's value to the controller action parameter.
	 * Applied to class method parameters.
	 *
	 * @param name Body's parameter name
	 * @param options Extra parameter options
	 */
	export function BodyParam(name: string, options: ParamOptions): Function;
	export function BodyParam(name: string, required?: boolean, parseJson?: boolean): Function;
	/**
	 * This decorator allows to inject a cookie value to the controller action parameter.
	 * Applied to class method parameters.
	 *
	 * @param name Cookie parameter name
	 * @param options Extra parameter options
	 */
	export function CookieParam(name: string, options: ParamOptions): Function;
	export function CookieParam(name: string, required?: boolean, parseJson?: boolean): Function;

}
declare module 'controllers.ts/error/http/ForbiddenError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 403 HTTP error.
	 */
	export class ForbiddenError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/error/http/InternalServerError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 500 HTTP error.
	 */
	export class InternalServerError extends HttpError {
	    name: string;
	    constructor(message: string);
	}

}
declare module 'controllers.ts/error/http/MethodNotAllowedError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for todo HTTP error.
	 */
	export class MethodNotAllowedError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/error/http/NotAcceptableError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 406 HTTP error.
	 */
	export class NotAcceptableError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/error/http/NotFoundError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 404 HTTP error.
	 */
	export class NotFoundError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/error/http/UnauthorizedError' {
	import { HttpError } from 'controllers.ts/error/http/HttpError';
	/**
	 * Exception for 401 HTTP error.
	 */
	export class UnauthorizedError extends HttpError {
	    name: string;
	    constructor(message?: string);
	}

}
declare module 'controllers.ts/server/error/BadHttpActionError' {
	export class BadHttpActionError extends Error {
	    name: string;
	    constructor(action: string);
	}

}
declare module 'controllers.ts/interceptor/InterceptorHelper' {
	import { ResultHandleOptions } from 'controllers.ts/ResultHandleOptions';
	/**
	 * Classes that intercepts response result must implement this interface.
	 */
	export class InterceptorHelper {
	    callInterceptors(options: ResultHandleOptions): any;
	    private callSendInterceptors(options);
	    private callJsonInterceptors(options);
	}

}
declare module 'controllers.ts/server/ExpressServer' {
	import { Server } from 'controllers.ts/server/Server';
	import { ParamType } from 'controllers.ts/metadata/ParamMetadata';
	import { ResultHandleOptions } from 'controllers.ts/ResultHandleOptions';
	import { InterceptorHelper } from 'controllers.ts/interceptor/InterceptorHelper';
	/**
	 * Integration with Express.js framework.
	 */
	export class ExpressServer implements Server {
	    private express;
	    private _interceptorHelper;
	    constructor(express: any);
	    interceptorHelper: InterceptorHelper;
	    registerAction(route: string | RegExp, actionType: string, executeCallback: (request: any, response: any) => any): void;
	    getParamFromRequest(request: any, paramName: string, paramType: ParamType): void;
	    handleSuccess(options: ResultHandleOptions): void;
	    handleError(options: ResultHandleOptions): void;
	    private handleResult(options);
	}

}
declare module 'controllers.ts/Factory' {
	import { ControllerRunner } from 'controllers.ts/ControllerRunner';
	/**
	 * Registers all loaded actions in your express application.
	 *
	 * @param expressApp Express application instance
	 * @param requireDirs Array of directories where from controller files will be loaded
	 */
	export function registerActionsInExpressApp(expressApp: any, requireDirs?: string[]): ControllerRunner;

}