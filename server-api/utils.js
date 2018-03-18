var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./model", "ems-sha256"], function (require, exports, model_1, sha256) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjectCreator = /** @class */ (function () {
        function ObjectCreator() {
        }
        ObjectCreator.createEntity = function (type) {
            return new type();
        };
        return ObjectCreator;
    }());
    var EMSClientOptions = /** @class */ (function () {
        function EMSClientOptions() {
        }
        return EMSClientOptions;
    }());
    exports.EMSClientOptions = EMSClientOptions;
    var EMSClient = /** @class */ (function () {
        function EMSClient(emsClientOptions) {
            this._apiPrefix = "/api/v1";
            var me = this;
            emsClientOptions = emsClientOptions || new EMSClientOptions();
            var httpClient = new HttpClient();
            httpClient.onClientUnauthorizedCallback = function (httpClient) {
                if (!!me.emsClientOptions.onClientUnauthorizedCallback) {
                    me.emsClientOptions.onClientUnauthorizedCallback(me);
                }
            };
            httpClient.onGetAuthSession = function (httpClient) {
                if (!me.emsClientOptions.getAuthSession)
                    return null;
                var authSession = me.emsClientOptions.getAuthSession(me);
                if (!authSession)
                    return null;
                return ["X-EasyMorph-Auth", authSession];
            };
            httpClient.baseUrl = emsClientOptions.serverUrl;
            httpClient.timeout = emsClientOptions.timeout || 7000;
            this._emsClientOptions = emsClientOptions;
            this.httpClient = httpClient;
        }
        Object.defineProperty(EMSClient.prototype, "emsClientOptions", {
            get: function () {
                return this._emsClientOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EMSClient.prototype, "apiPrefix", {
            get: function () {
                return this._apiPrefix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EMSClient.prototype, "ApiRoutePrefix", {
            get: function () {
                return this.apiPrefix;
            },
            enumerable: true,
            configurable: true
        });
        EMSClient.prototype.constructFilesUrl = function (spaceName, folder) {
            if (folder === void 0) { folder = null; }
            if (!spaceName)
                throw new Error("spaceName is not defined");
            var url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "files", new UriEncodedString(folder));
            return url;
        };
        /* SPACES */
        /**
         * Returns spaces list (name and is public). Suitable only for login
         */
        EMSClient.prototype.getSpacesList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces", "list");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.getSpacesIndex = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.getSpace = function (spaceName) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces", spaceName);
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.getSpaceStatus = function (spaceName) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces", spaceName, "status");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.createSpace = function (space) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces");
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, space)];
                });
            });
        };
        EMSClient.prototype.updateSpace = function (spaceName, space) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    if (!spaceName || !space || !space.spaceName)
                        return [2 /*return*/, Promise.reject(new Error("space name is empty"))];
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "spaces", spaceName);
                    return [2 /*return*/, this.httpClient.putJsonAsync(url, space)];
                });
            });
        };
        EMSClient.prototype.deleteSpace = function (spaceName) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.deleteAsync(HttpClient.joinUrl(this.ApiRoutePrefix, "spaces", spaceName))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            e_1 = _a.sent();
                            if (e_1 instanceof model_1.HttpClientNotFoundError)
                                return [2 /*return*/, true];
                            throw e_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /* FILES */
        EMSClient.prototype.isSpaceFileExists = function (spaceName, location, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.headAsync(HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "files", location, fileName))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            e_2 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EMSClient.prototype.deleteFile = function (spaceName, location, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.deleteAsync(HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "files", location, fileName))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            e_3 = _a.sent();
                            if (e_3 instanceof model_1.HttpClientNotFoundError)
                                return [2 /*return*/, true];
                            throw e_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        EMSClient.prototype.browseSpace = function (spaceName, location) {
            return __awaiter(this, void 0, void 0, function () {
                var url, dto;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "browse", new UriEncodedString(location));
                            return [4 /*yield*/, this.httpClient.getJsonAsync(url)];
                        case 1:
                            dto = _a.sent();
                            return [2 /*return*/, dto];
                    }
                });
            });
        };
        /* TASKS */
        EMSClient.prototype.getTasksList = function (spaceName) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url).then(function (x) { return x.values; })];
                });
            });
        };
        EMSClient.prototype.getTaskById = function (spaceName, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks", taskId);
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.deleteTask = function (spaceName, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks", taskId);
                    return [2 /*return*/, this.httpClient.deleteAsync(url)];
                });
            });
        };
        EMSClient.prototype.createTask = function (spaceName, task) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks");
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, task)];
                });
            });
        };
        EMSClient.prototype.updateTask = function (spaceName, taskId, task) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks", taskId);
                    return [2 /*return*/, this.httpClient.putJsonAsync(url, task)];
                });
            });
        };
        /* SERVER SETTINGS */
        EMSClient.prototype.getServerSettings = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "settings");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.updateServerSettings = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "settings");
                    return [2 /*return*/, this.httpClient.putJsonAsync(url, settings)];
                });
            });
        };
        /* SERVER LOG */
        EMSClient.prototype.getServerLog = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "server", "log");
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        EMSClient.prototype.clearServerLog = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "server", "log");
                    return [2 /*return*/, this.httpClient.deleteAsync(url)];
                });
            });
        };
        /* TASKS LOG */
        EMSClient.prototype.clearTaskLog = function (spaceName, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks", taskId, "log");
                    return [2 /*return*/, this.httpClient.deleteAsync(url)];
                });
            });
        };
        EMSClient.prototype.getTaskLog = function (spaceName, taskId, fields, runtimetoken) {
            if (fields === void 0) { fields = null; }
            if (runtimetoken === void 0) { runtimetoken = null; }
            return __awaiter(this, void 0, void 0, function () {
                var url, hasParams;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "tasks", taskId, "log");
                    hasParams = false;
                    if (!!fields) {
                        url += "?fields=" + fields;
                        hasParams = true;
                    }
                    if (!!runtimetoken) {
                        url += (hasParams ? "&token=" : "?token=") + runtimetoken;
                    }
                    return [2 /*return*/, this.httpClient.getJsonAsync(url)];
                });
            });
        };
        /* RUNNING TASKS */
        EMSClient.prototype.startTask = function (spaceName, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "runningtasks", taskId);
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, null)];
                });
            });
        };
        EMSClient.prototype.startTaskWithParameters = function (spaceName, taskId, taskStartRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "runningtasks", taskId, "payload");
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, taskStartRequest)];
                });
            });
        };
        EMSClient.prototype.stopTask = function (spaceName, taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "space", spaceName, "runningtasks", taskId);
                    return [2 /*return*/, this.httpClient.deleteAsync(url)];
                });
            });
        };
        /* AUTH */
        EMSClient.prototype.getSeed = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url, request;
                return __generator(this, function (_a) {
                    url = HttpClient.joinUrl(this.ApiRoutePrefix, "auth", "nonce");
                    request = {};
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, request)];
                });
            });
        };
        EMSClient.prototype.authLogin = function (userName, password, provider, requestToken, clientSeed) {
            return __awaiter(this, void 0, void 0, function () {
                var url, request;
                return __generator(this, function (_a) {
                    url = this.emsClientOptions.loginUrl;
                    if (!url) {
                        url = HttpClient.joinUrl(this.ApiRoutePrefix, "auth", "login");
                    }
                    request = {
                        clientSeed: clientSeed,
                        password: password,
                        provider: provider,
                        requestToken: requestToken,
                        userName: userName
                    };
                    return [2 /*return*/, this.httpClient.postJsonAsync(url, request)];
                });
            });
        };
        /**
         * Returns an authentification token, also calls emsClientOptions.storeAuthSession callback (user defined) to store auth token in a repo
         * @param authProviderType
         * @param userName
         * @param password
         */
        EMSClient.prototype.login = function (authProviderType, userName, password) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var me;
                return __generator(this, function (_a) {
                    me = this;
                    return [2 /*return*/, this
                            .getSeed()
                            .then(function (x) {
                            var passwordHash = CryptHelper.CalculateSHA256Hex(password);
                            var clientRandom = Utils.generateRandomString();
                            var all = passwordHash + x.nonce + clientRandom;
                            var allHash = CryptHelper.CalculateSHA256Hex(all);
                            return _this.authLogin(userName, allHash, authProviderType, x.nonce, clientRandom);
                        })
                            .then(function (x) {
                            if (!!_this.emsClientOptions.storeAuthSession) {
                                _this.emsClientOptions.storeAuthSession(me, x.token);
                            }
                            return x;
                        })
                            .then(function (x) { return x.token; })];
                });
            });
        };
        return EMSClient;
    }());
    exports.EMSClient = EMSClient;
    var SiteUrlBuilder = /** @class */ (function () {
        function SiteUrlBuilder() {
        }
        SiteUrlBuilder.tasksUrl = function (spaceName) {
            if (!spaceName)
                throw new Error("spaceName is empty ");
            return HttpClient.joinUrl("/space", spaceName, "tasks");
        };
        SiteUrlBuilder.filesUrl = function (spaceName) {
            if (!spaceName)
                throw new Error("spaceName is empty ");
            return HttpClient.joinUrl("/space", spaceName, "files");
        };
        SiteUrlBuilder.fileUrl = function (spaceName, path, fileName) {
            if (!spaceName)
                throw new Error("spaceName is empty ");
            return HttpClient.joinUrl("/space", spaceName, "files", "get", path, fileName);
        };
        SiteUrlBuilder.splitter = function (spaceName) {
            if (!spaceName)
                throw new Error("spaceName is empty ");
            return HttpClient.joinUrl("/account", "splitter") + "?spaceid=" + encodeURIComponent(spaceName);
        };
        SiteUrlBuilder.httpNotFoundPage = function () {
            return "/StatusCode/Error/404";
        };
        SiteUrlBuilder.httpForbiddenPage = function () {
            return "/StatusCode/Error/403";
        };
        SiteUrlBuilder.spacesIndex = function () {
            return "/spaces";
        };
        return SiteUrlBuilder;
    }());
    exports.SiteUrlBuilder = SiteUrlBuilder;
    var CryptHelper = /** @class */ (function () {
        function CryptHelper() {
        }
        CryptHelper.CalculateSHA256Hex = function (input) {
            var hash = sha256.create();
            hash.update(input);
            return hash.hex();
        };
        return CryptHelper;
    }());
    exports.CryptHelper = CryptHelper;
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
            this.timeout = 5000;
        }
        Object.defineProperty(HttpClient.prototype, "baseUrl", {
            get: function () {
                return this._baseUrl;
            },
            set: function (val) {
                if (!!val) {
                    while (val[val.length - 1] == '/') {
                        val = val.substring(0, val.length - 1);
                    }
                }
                this._baseUrl = val;
            },
            enumerable: true,
            configurable: true
        });
        HttpClient.prototype.getJsonAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var result, model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (url.indexOf("?") !== -1) {
                                url += "&_=" + new Date().getTime();
                            }
                            else {
                                url += "?_=" + new Date().getTime();
                            }
                            return [4 /*yield*/, this.sendRequest({
                                    contentType: "application/json; charset=utf-8",
                                    method: "GET",
                                    url: url
                                })
                                //console.log(result.responseText);
                            ];
                        case 1:
                            result = _a.sent();
                            model = JSON.parse(result.responseText);
                            return [2 /*return*/, model];
                    }
                });
            });
        };
        HttpClient.prototype.postJsonAsync = function (url, model) {
            return __awaiter(this, void 0, void 0, function () {
                var result, resultModel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendRequest({
                                contentType: "application/json; charset=utf-8",
                                method: "POST",
                                url: url,
                                params: !!model ? JSON.stringify(model) : null
                            })];
                        case 1:
                            result = _a.sent();
                            if (result.responseText) {
                                resultModel = JSON.parse(result.responseText);
                                return [2 /*return*/, resultModel];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpClient.prototype.putJsonAsync = function (url, model) {
            return __awaiter(this, void 0, void 0, function () {
                var result, resultModel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendRequest({
                                contentType: "application/json; charset=utf-8",
                                method: "PUT",
                                url: url,
                                params: !!model ? JSON.stringify(model) : null
                            })];
                        case 1:
                            result = _a.sent();
                            if (result.responseText) {
                                resultModel = JSON.parse(result.responseText);
                                return [2 /*return*/, resultModel];
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpClient.prototype.deleteAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendRequest({
                                method: "DELETE",
                                url: url,
                                contentType: "application/json; charset=utf-8",
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpClient.prototype.headAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendRequest({
                                method: "HEAD",
                                url: url,
                                contentType: "application/json; charset=utf-8",
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        HttpClient.joinUrl = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var result = "";
            for (var i = 0; i < params.length; i++) {
                var p = params[i];
                if (p instanceof UriEncodedString) {
                    if (!!p && !!p.value) {
                        console.log("p.value=" + p.value);
                        var decoded = decodeURIComponent(p.value);
                        if (!decoded)
                            continue;
                        if (result !== "" && !result.endsWith("/") && (decoded.length > 0 && decoded[0] !== "/"))
                            result += "/";
                        result += decoded;
                    }
                }
                else {
                    if (!p || p === "")
                        continue;
                    p = p.split("/").map(function (v) { return encodeURIComponent(v); }).join("/");
                    if (result !== "" && !result.endsWith("/"))
                        result += "/";
                    if (i !== 0 && p.length >= 1 && p[0] === "/")
                        p = p.slice(1);
                    result += p;
                }
            }
            return result;
        };
        HttpClient.prototype.sendRequest = function (opts) {
            return __awaiter(this, void 0, void 0, function () {
                var me;
                return __generator(this, function (_a) {
                    me = this;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            var url = opts.url; // Utils.joinUrl(ApiRoutePrefix, opts.url);
                            if (!!me.baseUrl) {
                                url = me.baseUrl + url;
                            }
                            console.log("send Request to " + url);
                            xhr.open(opts.method, url, true);
                            // timeout setup must come after xhr.open (IE11 bug)
                            xhr.timeout = me.timeout;
                            xhr.onload = function () {
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    resolve({
                                        status: xhr.status,
                                        reposne: xhr.response,
                                        responseText: xhr.responseText
                                    });
                                }
                                else {
                                    var error = Utils.constructError(xhr);
                                    if (error instanceof model_1.HttpClientUnauthorizedError) {
                                        if (!!me.onClientUnauthorizedCallback) {
                                            me.onClientUnauthorizedCallback(me);
                                        }
                                    }
                                    reject(error);
                                }
                            };
                            xhr.onerror = function () {
                                return reject(new model_1.HttpClientCommunicationError("Server unreachable."));
                            };
                            xhr.ontimeout = function (e) {
                                return reject(new model_1.HttpClientCommunicationError("Server operation timeout."));
                            };
                            //auth
                            if (!!me.onGetAuthSession) {
                                var authSession = me.onGetAuthSession(me);
                                if (!!authSession) {
                                    xhr.setRequestHeader(authSession[0], authSession[1]);
                                }
                            }
                            if (opts.headers) {
                                Object.keys(opts.headers).forEach(function (key) {
                                    xhr.setRequestHeader(key, opts.headers[key]);
                                });
                            }
                            var params = opts.params;
                            // We'll need to stringify if we've been given an object
                            // If we have a string, this is skipped.
                            if (params && typeof params === 'object') {
                                params = Object.keys(params).map(function (key) {
                                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                                }).join('&');
                            }
                            xhr.setRequestHeader("Content-Type", opts.contentType);
                            xhr.send(params);
                        })];
                });
            });
        };
        return HttpClient;
    }());
    exports.HttpClient = HttpClient;
    var ApplicationContext = /** @class */ (function () {
        function ApplicationContext() {
        }
        ApplicationContext.getAuthSession = function () {
            return localStorage.getItem(model_1.LocalStorageKeys.AuthSessionId);
        };
        ApplicationContext.setAuthSession = function (authSession) {
            localStorage.setItem(model_1.LocalStorageKeys.AuthSessionId, authSession);
        };
        //public static removeAuthSession() {
        //    localStorage.removeItem(LocalStorageKeys.AuthSessionId);
        //}
        ApplicationContext.getLastVisitedSpaceId = function () {
            return localStorage.getItem(model_1.LocalStorageKeys.LastVisitedSpaceId);
        };
        ApplicationContext.setLastVisitedSpaceId = function (spaceid) {
            localStorage.setItem(model_1.LocalStorageKeys.LastVisitedSpaceId, spaceid);
        };
        ApplicationContext.getLastVisitedFolder = function (spaceid) {
            if (!spaceid)
                throw new Error("space is not defined");
            return localStorage.getItem(model_1.LocalStorageKeys.LastVisitedFolder + ":" + spaceid);
        };
        ApplicationContext.setLastVisitedFolder = function (spaceid, folderPath) {
            if (!spaceid)
                throw new Error("space is not defined");
            return localStorage.setItem(model_1.LocalStorageKeys.LastVisitedFolder + ":" + spaceid, folderPath);
        };
        return ApplicationContext;
    }());
    exports.ApplicationContext = ApplicationContext;
    var UriEncodedString = /** @class */ (function () {
        function UriEncodedString(value) {
            this.value = value;
        }
        return UriEncodedString;
    }());
    exports.UriEncodedString = UriEncodedString;
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.buildEMSClient = function () {
            if (!!Utils.cachedEMSclient) {
                return Utils.cachedEMSclient;
            }
            var options = new EMSClientOptions();
            // options.serverUrl = "http://localhost:6330/";
            options.loginUrl = HttpClient.joinUrl("/", "account", "login");
            options.onClientUnauthorizedCallback = function (sender) {
                location.href = "/account/login";
            };
            options.storeAuthSession = function (sender, session) {
                ApplicationContext.setAuthSession(session);
            };
            options.getAuthSession = function (sender) {
                return ApplicationContext.getAuthSession();
            };
            var client = new EMSClient(options);
            Utils.cachedEMSclient = client;
            return client;
        };
        Utils.calculatePasswordHash = function (password) {
            return CryptHelper.CalculateSHA256Hex(password);
        };
        Utils.getParameterByName = function (name, url) {
            if (url === void 0) { url = null; }
            if (!url)
                url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
            if (!results)
                return null;
            if (!results[2])
                return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        Utils.isAbsoluteUrl = function (url) {
            if (!url)
                return false;
            return (url.indexOf('http://') === 0 || url.indexOf('https://') === 0);
        };
        Utils.constructError = function (xhr) {
            try {
                var responseType = xhr.getResponseHeader('content-type');
                if (responseType && responseType.indexOf("json") !== 0 && xhr.responseText && xhr.responseText.length > 0 && xhr.responseText[0] === "{") {
                    var error = JSON.parse(xhr.responseText);
                    switch (error.error.code) {
                        case model_1.ReadableErrorCode.Conflict: return new model_1.HttpClientConflictError(error.error.message);
                        case model_1.ReadableErrorCode.Forbidden: return new model_1.HttpClientForbiddenError(error.error.message);
                        case model_1.ReadableErrorCode.GeneralError: return new model_1.HttpClientGeneralErrorError(error.error.message);
                        case model_1.ReadableErrorCode.NotFound: return new model_1.HttpClientNotFoundError(error.error.message);
                        case model_1.ReadableErrorCode.Unauthorized: return new model_1.HttpClientUnauthorizedError(error.error.message);
                        case model_1.ReadableErrorCode.BadArgument:
                            var fe = (error.error.details || []).map(function (x) { return new model_1.FieldError(x.target, x.message, model_1.FieldErrorType[x.code]); });
                            return new model_1.HttpClientBadArgumentError(error.error.message, fe || []);
                        default: return new model_1.HttpClientServerFatalError(xhr.status, error.error.message);
                    }
                }
                return new model_1.HttpClientServerFatalError(undefined, xhr.statusText || "Server unreachable.");
            }
            catch (e) {
                return new model_1.HttpClientServerFatalError(undefined, e);
            }
        };
        Utils.generateRandomString = function () {
            return this.rndString8() + this.rndString8();
        };
        Utils.rndString8 = function () {
            return Math.random().toString(16).substring(3).substring(0, 8);
        };
        Utils.clearValidation = function (validator, formSelector) {
            if (!!validator) {
                validator.resetForm();
                $(formSelector + " .form-group").each(function () {
                    $(this).removeClass('has-error');
                });
            }
        };
        Utils.showValidationErrors = function (validator, e) {
            if (!!validator && !!e && !!e.fieldErrors) {
                try {
                    var ve_1 = new Object();
                    e.fieldErrors.forEach(function (x) { ve_1[x.field] = x.message; });
                    validator.showErrors(ve_1);
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
        Utils.showValidationErrorsFromDict = function (validator, errors) {
            if (!!validator && !!errors) {
                try {
                    validator.showErrors(errors);
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
        Utils.makeAbsolutePath = function (path, value) {
            if (typeof (path) !== "undefined" && value !== null && value !== "" && path !== null && path.length > 1 && value[1] !== ':') {
                if (!path.endsWith("\\"))
                    path = path + "\\";
                return path + value;
            }
            return value;
        };
        Utils.makeRelativePath = function (path, value) {
            if (!value || !path)
                return value;
            var regEx = new RegExp('^' + this.escapeRegExp(path), "i");
            if (value.match(regEx) === null) {
                return value;
            }
            var result = value.replace(regEx, '');
            if (result.length > 0 && result[0] === '\\') {
                result = result.substr(1);
            }
            return result;
        };
        Utils.highlightText = function (input, searchText) {
            if (typeof (input) === "undefined" || input === null || input === "")
                return input;
            var parsedSeach = '(' + searchText.trim().replace(/ +/g, '|') + ')';
            var parsedMsg = input.split(new RegExp(parsedSeach, 'gi'));
            var result = "";
            for (var i = 0; i < parsedMsg.length; i++) {
                if (i % 2) {
                    result += "<span class='highlight'>" + parsedMsg[i] + "</span>";
                }
                else {
                    result += parsedMsg[i];
                }
            }
            return result;
        };
        Utils.splitNameValue = function (input, delimiter) {
            if (delimiter === void 0) { delimiter = "&"; }
            var result = {};
            input.split(delimiter).forEach(function (x) {
                var arr = x.split('=');
                arr[1] && (result[arr[0]] = arr[1]);
            });
        };
        Utils.logBase = function (val, base) {
            return Math.log(val) / Math.log(base);
        };
        Utils.SizeSuffix = function (value, decimalPlaces) {
            if (decimalPlaces === void 0) { decimalPlaces = 1; }
            if (value < 0) {
                return "-" + this.SizeSuffix(-value);
            }
            if (value == 0) {
                return "0.0 KB";
            }
            // mag is 0 for bytes, 1 for KB, 2, for MB, etc.
            var mag = Math.floor(this.logBase(value, 1024));
            // 1L << (mag * 10) == 2 ^ (10 * mag) 
            // [i.e. the number of bytes in the unit corresponding to mag]
            var adjustedSize = value / (1 << (mag * 10));
            // make adjustment when the value is large enough that
            // it would round up to 1000 or more
            if (Math.round(adjustedSize) >= 1000) {
                mag += 1;
                adjustedSize /= 1024;
            }
            if (mag === 0) {
                mag++;
                adjustedSize /= 1024;
            }
            return adjustedSize.toFixed(decimalPlaces) + " " + this.SizeSuffixes[mag];
        };
        Utils.escapeRegExp = function (str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };
        Utils.buildBSValidator = function (selector) {
            return new Promise(function (resolve, reject) {
                $(document).ready(function () {
                    console.log("buildBSValidator");
                    var validator = $(selector).validate({
                        highlight: function (element) {
                            $(element).closest('.form-group').addClass('has-error');
                        },
                        unhighlight: function (element) {
                            $(element).closest('.form-group').removeClass('has-error');
                        },
                        errorElement: 'span',
                        errorClass: 'help-block',
                        errorPlacement: function (error, element) {
                            if (element.parent('.input-group').length) {
                                error.insertAfter(element.parent());
                            }
                            else {
                                error.insertAfter(element);
                            }
                        }
                    });
                    resolve(validator);
                });
            });
        };
        Utils.SizeSuffixes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        return Utils;
    }());
    exports.Utils = Utils;
    var ValidationChecks = /** @class */ (function () {
        function ValidationChecks() {
        }
        /**
         * checks password and returns message if validation fails. Returns undefined if everything is OK.
         * @param input raw password
         */
        ValidationChecks.checkPassword = function (input) {
            if (!input)
                return "Password required";
            if (input.length < 6)
                return "Minimum password length is 6 chars";
            if (input.length > 100)
                return "Maximum password length is 100 chars";
            return undefined;
        };
        return ValidationChecks;
    }());
    exports.ValidationChecks = ValidationChecks;
    var KeyedCollection = /** @class */ (function () {
        function KeyedCollection() {
            this.items = {};
            this.count = 0;
        }
        KeyedCollection.prototype.ContainsKey = function (key) {
            return this.items.hasOwnProperty(key);
        };
        KeyedCollection.prototype.Count = function () {
            return this.count;
        };
        KeyedCollection.prototype.Add = function (key, value) {
            this.items[key] = value;
            this.count++;
        };
        KeyedCollection.prototype.Remove = function (key) {
            var val = this.items[key];
            delete this.items[key];
            this.count--;
            return val;
        };
        KeyedCollection.prototype.Item = function (key) {
            return this.items[key];
        };
        KeyedCollection.prototype.Keys = function () {
            var keySet = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    keySet.push(prop);
                }
            }
            return keySet;
        };
        KeyedCollection.prototype.Values = function () {
            var values = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    values.push(this.items[prop]);
                }
            }
            return values;
        };
        return KeyedCollection;
    }());
    exports.KeyedCollection = KeyedCollection;
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    var DeletingQueue = /** @class */ (function () {
        function DeletingQueue(spaceName, emsClient) {
            this.spaceName = spaceName;
            this.emsClient = emsClient;
            this._processedFilesCount = 0;
            this._totalFilesCount = 0;
            this._filesQueue = new Array();
            this._state = "idle";
            this._processingFileName = "";
            this._operationCancelingRequested = false;
            this.stateChanged();
        }
        DeletingQueue.prototype.abort = function () {
            this._operationCancelingRequested = true;
        };
        DeletingQueue.prototype.stateChanged = function () {
            if (this._state === "idle") {
                this._operationCancelingRequested = false;
                this._processedFilesCount = 0;
                this._totalFilesCount = 0;
                this._processingFileName = "";
            }
            if (this._state === "error") {
                this._filesQueue = [];
            }
        };
        DeletingQueue.prototype.deleteFiles = function (folder, files) {
            if (!files || !files.length)
                return;
            if (this._state === "error")
                return;
            // clear counters before upoad
            var totalNewFiles = 0;
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                totalNewFiles += 1;
                this._filesQueue.push({
                    folder: folder,
                    name: file
                });
            }
            this._totalFilesCount += totalNewFiles;
            if (this._state === "idle") {
                this.processNextFile(this);
                this.onstarted();
                this.reportProgress();
            }
        };
        DeletingQueue.prototype.processNextFile = function (me) {
            if (me._state !== "error") {
                if (me._filesQueue.length > 0) {
                    var file = me._filesQueue.pop();
                    me.deleteFile(file);
                }
                else {
                    me._state = "idle";
                    me.reportFinished();
                }
            }
        };
        DeletingQueue.prototype.deleteFile = function (file) {
            if (this._state === "error")
                return;
            this.changeState("processing");
            this._processingFileName = file.name;
            if (this._operationCancelingRequested) {
                this.reportError("Operation canceled by user");
                return;
            }
            var q = this;
            this.emsClient.deleteFile(this.spaceName, file.folder, file.name)
                .then(function (x) {
                q.reportFileDone();
                setTimeout(function () { q.processNextFile(q); }, 10);
            })
                .catch(function (error) {
                if (error instanceof model_1.BaseHttpClientError)
                    q.reportError(error.message);
                else
                    q.reportError(error);
            });
        };
        DeletingQueue.prototype.reportFinished = function () {
            this.changeState("done");
            this.onfinished(this._processedFilesCount, this._processingFileName);
            this.changeState("idle");
        };
        DeletingQueue.prototype.changeState = function (newState) {
            this._state = newState;
            this.stateChanged();
        };
        DeletingQueue.prototype.reportFileDone = function () {
            this.reportProgress();
            this._processedFilesCount += 1;
            this.onfiledone(this._processingFileName);
        };
        DeletingQueue.prototype.setError = function (e) {
            if (e instanceof model_1.BaseHttpClientError) {
                this.reportError(e.message);
            }
            else
                this.reportError(e);
        };
        DeletingQueue.prototype.reportError = function (errorText) {
            this.changeState("error");
            if (this._processingFileName !== "") {
                this.onerror("Error deleting file " + this._processingFileName + ": " + errorText);
            }
            else {
                this.onerror(errorText);
            }
            this.changeState("idle");
        };
        DeletingQueue.prototype.reportProgress = function () {
            //loded
            var percentage = Math.round(((this._processedFilesCount + 1) * 100) / this._totalFilesCount);
            this.onprogress(this._processedFilesCount + 1, this._totalFilesCount, percentage, this._processingFileName);
        };
        return DeletingQueue;
    }());
    exports.DeletingQueue = DeletingQueue;
    var UploadingQueue = /** @class */ (function () {
        function UploadingQueue(spaceName, emsClient) {
            this.spaceName = spaceName;
            this.emsClient = emsClient;
            this._totalSize = 0;
            this._processedSize = 0;
            this._processedFilesCount = 0;
            this._totalFilesCount = 0;
            this._filesQueue = new Array();
            this._uploadingState = "idle";
            this._processingFileName = "";
            this._request = undefined;
            this.stateChanged();
        }
        UploadingQueue.prototype.stateChanged = function () {
            if (this._uploadingState === "idle") {
                this._processedFilesCount = 0;
                this._processedSize = 0;
                this._totalFilesCount = 0;
                this._totalSize = 0;
                this._processingFileName = "";
            }
            if (this._uploadingState === "error") {
                this._filesQueue = [];
            }
        };
        UploadingQueue.prototype.changeState = function (newState) {
            this._uploadingState = newState;
            this.stateChanged();
        };
        UploadingQueue.prototype.reportProgress = function (currentLoaded) {
            //loded
            var percentage = undefined;
            if (currentLoaded !== null) {
                percentage = Math.round(((this._processedSize + currentLoaded) * 100) / this._totalSize);
            }
            else {
                percentage = Math.round(((this._processedFilesCount + 1) * 100) / this._totalFilesCount);
            }
            this.onprogress(this._processedFilesCount + 1, this._totalFilesCount, percentage, this._processingFileName);
        };
        UploadingQueue.prototype.reportFinished = function () {
            this.changeState("done");
            this.onfinished(this._processedFilesCount, this._processingFileName);
            this.changeState("idle");
        };
        UploadingQueue.prototype.setError = function (e) {
            if (e instanceof model_1.BaseHttpClientError) {
                this.reportError(e.message);
            }
            else
                this.reportError(e);
        };
        UploadingQueue.prototype.reportError = function (errorText) {
            this.changeState("error");
            if (this._processingFileName !== "") {
                this.onerror("Error uploading file " + this._processingFileName + ": " + errorText);
            }
            else {
                this.onerror(errorText);
            }
            this.changeState("idle");
        };
        UploadingQueue.prototype.reportFileDone = function (fileSize) {
            this.reportProgress(fileSize);
            this._processedSize += fileSize;
            this._processedFilesCount += 1;
            this.onfiledone(this._processingFileName);
        };
        UploadingQueue.prototype.uploadFile = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var formData, uploadingQueue_1, request, url, authSession, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            console.log("uploadFile " + file.formFile.name);
                            if (!file)
                                return [2 /*return*/];
                            if (this._uploadingState === "error")
                                return [2 /*return*/];
                            this._uploadingState = "processing";
                            this._processingFileName = file.formFile.name;
                            if (!!file.overrideIfExists) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.emsClient.isSpaceFileExists(this.spaceName, file.destinationFolder, file.formFile.name)];
                        case 1:
                            // check file already exists
                            if (_a.sent()) {
                                this.reportError("File already exists");
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2:
                            formData = new FormData();
                            formData.append("meta", "data");
                            formData.append("files", file.formFile);
                            uploadingQueue_1 = this;
                            request = new XMLHttpRequest();
                            this._request = request;
                            request.upload.addEventListener("progress", function (e) {
                                if (e.lengthComputable) {
                                    uploadingQueue_1.reportProgress(e.loaded);
                                }
                                else {
                                    uploadingQueue_1.reportProgress(null);
                                }
                            }, false);
                            request.onload = function (oEvent) {
                                if (request.status >= 200 && request.status <= 299) {
                                    uploadingQueue_1._request = undefined;
                                    uploadingQueue_1.reportFileDone(file.formFile.size);
                                    setTimeout(function () { uploadingQueue_1.processNextFile(uploadingQueue_1); }, 10);
                                }
                                else {
                                    uploadingQueue_1._request = undefined;
                                    //console.log(request.getResponseHeader('content-type'));
                                    var error = Utils.constructError(request);
                                    uploadingQueue_1.reportError(error.message);
                                }
                            };
                            request.onabort = function (oEvent) {
                                console.log("onabort");
                                //  uploadingQueue._request = undefined;
                            };
                            request.onerror = function (oEvent) {
                                uploadingQueue_1._request = undefined;
                                uploadingQueue_1.reportError("Server unreachable.");
                            };
                            url = this.emsClient.constructFilesUrl(this.spaceName, file.destinationFolder);
                            request.open(file.overrideIfExists ? "PUT" : "POST", url, true);
                            if (file.formFile.size) {
                                request.setRequestHeader("X-Files-Size", file.formFile.size.toString(10));
                            }
                            if (!!this.emsClient.emsClientOptions.getAuthSession) {
                                authSession = this.emsClient.emsClientOptions.getAuthSession;
                                if (!!authSession) {
                                    request.setRequestHeader(authSession[0], authSession[1]);
                                }
                            }
                            request.send(formData);
                            return [3 /*break*/, 4];
                        case 3:
                            e_4 = _a.sent();
                            Notify.showException(e_4);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UploadingQueue.prototype.abort = function () {
            this.reportError("Operation canceled by user");
            if (this._request !== undefined) {
                this._request.abort();
            }
        };
        UploadingQueue.prototype.addFiles = function (destinationFolder, overrideIfExists, files, browsing) {
            if (browsing === void 0) { browsing = null; }
            return __awaiter(this, void 0, void 0, function () {
                var totalSize, _i, files_2, file, e_5, totalNewFiles, totalNewFilesSize, _a, files_3, file;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!files || !files.length)
                                return [2 /*return*/];
                            if (this._uploadingState === "error")
                                return [2 /*return*/];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 11]);
                            if (!!browsing) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.emsClient.browseSpace(this.spaceName, destinationFolder)];
                        case 2:
                            browsing = _b.sent();
                            _b.label = 3;
                        case 3:
                            totalSize = 0;
                            for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                                file = files_2[_i];
                                totalSize += file.size;
                            }
                            if (browsing.freeSpaceBytes < totalSize * 3) {
                                MessageBox.alert("Not enough free disk space");
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 11];
                        case 4:
                            e_5 = _b.sent();
                            if (!(e_5 instanceof model_1.HttpClientForbiddenError)) return [3 /*break*/, 6];
                            return [4 /*yield*/, MessageBox.alert("You don't have permission to upload files to this folder")];
                        case 5:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 6:
                            if (!(e_5 instanceof model_1.BaseHttpClientError)) return [3 /*break*/, 8];
                            return [4 /*yield*/, MessageBox.alert(e_5.message)];
                        case 7:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, MessageBox.alert(e_5)];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [2 /*return*/];
                        case 11:
                            totalNewFiles = 0;
                            totalNewFilesSize = 0;
                            for (_a = 0, files_3 = files; _a < files_3.length; _a++) {
                                file = files_3[_a];
                                totalNewFiles += 1;
                                totalNewFilesSize += file.size;
                                this._filesQueue.push({
                                    destinationFolder: destinationFolder,
                                    formFile: file,
                                    overrideIfExists: overrideIfExists
                                });
                            }
                            this._totalFilesCount += totalNewFiles;
                            this._totalSize += totalNewFilesSize;
                            if (this._uploadingState === "idle") {
                                this.processNextFile(this);
                                this.onstarted();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UploadingQueue.prototype.processNextFile = function (me) {
            if (me._uploadingState !== "error") {
                if (me._filesQueue.length > 0) {
                    var file = me._filesQueue.pop();
                    me.uploadFile(file);
                }
                else {
                    if (me._uploadingState === "processing") {
                        me.reportFinished();
                        me.changeState("idle");
                    }
                }
            }
        };
        return UploadingQueue;
    }());
    exports.UploadingQueue = UploadingQueue;
    var MessageBox = /** @class */ (function () {
        function MessageBox() {
        }
        MessageBox.confirm = function (message, confimationText, cancelationText) {
            return new Promise(function (resolve, reject) {
                bootbox.confirm({
                    message: message,
                    buttons: {
                        confirm: { label: confimationText || 'Yes' /*, className: 'btn-success' */ },
                        cancel: { label: cancelationText || 'No' /*, className: 'btn-danger'*/ }
                    },
                    callback: function (result) {
                        resolve(result);
                    }
                });
            });
        };
        MessageBox.alert = function (message) {
            return new Promise(function (resolve, reject) {
                bootbox.alert({
                    message: message,
                    callback: function () {
                        resolve();
                    }
                });
            });
        };
        return MessageBox;
    }());
    exports.MessageBox = MessageBox;
    var Notify = /** @class */ (function () {
        function Notify() {
        }
        Notify.showException = function (e, title) {
            if (title === void 0) { title = null; }
            Notify.showErrorMessage(e.message, title);
        };
        Notify.showErrorMessage = function (message, title) {
            if (title === void 0) { title = null; }
            Notify.show("danger", message, title, "glyphicon glyphicon-warning-sign");
        };
        Notify.showInfo = function (message, title) {
            if (title === void 0) { title = null; }
            Notify.show("info", message, title, "glyphicon glyphicon-info-sign");
        };
        Notify.show = function (type, message, title, icon) {
            var offset = $("#navbar-collapse").height() || 70;
            offset += 10;
            $
                .notify({
                title: !!title ? "<b>" + title + "</b>:" : null,
                message: message,
                icon: icon,
            }, {
                type: type,
                element: 'body',
                position: null,
                allow_dismiss: true,
                newest_on_top: false,
                offset: offset,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 500,
                placement: {
                    align: "center",
                    from: "top"
                },
                onShow: null,
                onShown: null,
                onClose: null,
                onClosed: null,
                mouse_over: null,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
            });
        };
        return Notify;
    }());
    exports.Notify = Notify;
    var BrowserFeautures = /** @class */ (function () {
        function BrowserFeautures() {
        }
        BrowserFeautures.draggable = function () {
            if (this._draggable == undefined) {
                this._draggable = 'draggable' in document.createElement('span');
            }
            return this._draggable;
        };
        BrowserFeautures.hasUploadProgress = function () {
            if (this._uploadProgress == undefined) {
                this._uploadProgress = "upload" in new XMLHttpRequest;
            }
            return this._uploadProgress;
        };
        BrowserFeautures._draggable = undefined;
        BrowserFeautures._uploadProgress = undefined;
        return BrowserFeautures;
    }());
    exports.BrowserFeautures = BrowserFeautures;
});
//# sourceMappingURL=utils.js.map