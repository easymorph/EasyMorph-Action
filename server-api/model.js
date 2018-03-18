var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EditMode;
    (function (EditMode) {
        EditMode[EditMode["Create"] = 1] = "Create";
        EditMode[EditMode["Edit"] = 2] = "Edit";
        EditMode[EditMode["View"] = 3] = "View";
    })(EditMode = exports.EditMode || (exports.EditMode = {}));
    var SpacePermission;
    (function (SpacePermission) {
        SpacePermission["TasksList"] = "TasksList";
        SpacePermission["TaskLogView"] = "TaskLogView";
        SpacePermission["TaskLogDeletion"] = "TaskLogDeletion";
        SpacePermission["TaskCreate"] = "TaskCreate";
        SpacePermission["TaskModify"] = "TaskModify";
        SpacePermission["TaskExecution"] = "TaskExecution";
        SpacePermission["TaskDeletion"] = "TaskDeletion";
        SpacePermission["FilesList"] = "FilesList";
        SpacePermission["FileUpload"] = "FileUpload";
        SpacePermission["FileDownload"] = "FileDownload";
        SpacePermission["FileDeletion"] = "FileDeletion";
        SpacePermission["TaskDocumentation"] = "TaskDocumentation";
        SpacePermission["TaskChangeProjectFile"] = "TaskChangeProjectFile";
        SpacePermission["RetrieveStatus"] = "RetrieveStatus";
    })(SpacePermission = exports.SpacePermission || (exports.SpacePermission = {}));
    var SpaceWebFilesAccessMode;
    (function (SpaceWebFilesAccessMode) {
        SpaceWebFilesAccessMode["Disabled"] = "Disabled";
        SpaceWebFilesAccessMode["OnlyDownload"] = "OnlyDownload";
        SpaceWebFilesAccessMode["OnlyUpload"] = "OnlyUpload";
        SpaceWebFilesAccessMode["FullAccess"] = "FullAccess";
    })(SpaceWebFilesAccessMode = exports.SpaceWebFilesAccessMode || (exports.SpaceWebFilesAccessMode = {}));
    var ReadableErrorCode;
    (function (ReadableErrorCode) {
        ReadableErrorCode["NotFound"] = "NotFound";
        ReadableErrorCode["GeneralError"] = "GeneralError";
        ReadableErrorCode["Conflict"] = "Conflict";
        ReadableErrorCode["Forbidden"] = "Forbidden";
        ReadableErrorCode["BadArgument"] = "BadArgument";
        ReadableErrorCode["Unauthorized"] = "Unauthorized";
    })(ReadableErrorCode = exports.ReadableErrorCode || (exports.ReadableErrorCode = {}));
    var FieldErrorType;
    (function (FieldErrorType) {
        FieldErrorType["Required"] = "Required";
        FieldErrorType["MalformedValue"] = "MalformedValue";
    })(FieldErrorType = exports.FieldErrorType || (exports.FieldErrorType = {}));
    var SwitchState;
    (function (SwitchState) {
        SwitchState["Disabled"] = "Disabled";
        SwitchState["Enabled"] = "Enabled";
    })(SwitchState = exports.SwitchState || (exports.SwitchState = {}));
    var AuthProviderType;
    (function (AuthProviderType) {
        AuthProviderType["Space"] = "Space";
        AuthProviderType["LocalUser"] = "LocalUser";
    })(AuthProviderType = exports.AuthProviderType || (exports.AuthProviderType = {}));
    var LocalStorageKeys;
    (function (LocalStorageKeys) {
        LocalStorageKeys["AuthSessionId"] = "AuthSessionId";
        LocalStorageKeys["LastVisitedSpaceId"] = "LastVisitedSpaceId";
        LocalStorageKeys["LastVisitedFolder"] = "LastVisitedFolder";
    })(LocalStorageKeys = exports.LocalStorageKeys || (exports.LocalStorageKeys = {}));
    var SpaceAccessRestriction;
    (function (SpaceAccessRestriction) {
        SpaceAccessRestriction["None"] = "None";
        SpaceAccessRestriction["BasicPassword"] = "BasicPassword";
    })(SpaceAccessRestriction = exports.SpaceAccessRestriction || (exports.SpaceAccessRestriction = {}));
    var SpaceTaskAccessMode;
    (function (SpaceTaskAccessMode) {
        SpaceTaskAccessMode["Disabled"] = "Disabled";
        SpaceTaskAccessMode["LockTask"] = "LockTask";
        SpaceTaskAccessMode["LockProject"] = "LockProject";
        SpaceTaskAccessMode["FullAccess"] = "FullAccess";
    })(SpaceTaskAccessMode = exports.SpaceTaskAccessMode || (exports.SpaceTaskAccessMode = {}));
    var FieldError = /** @class */ (function () {
        function FieldError(field, message, fieldErrorType) {
            this.field = field;
            this.message = message;
            this.fieldErrorType = fieldErrorType;
        }
        return FieldError;
    }());
    exports.FieldError = FieldError;
    var BaseHttpClientError = /** @class */ (function () {
        function BaseHttpClientError(code, message) {
            this.code = code;
            this.message = message;
        }
        return BaseHttpClientError;
    }());
    exports.BaseHttpClientError = BaseHttpClientError;
    var HttpClientConflictError = /** @class */ (function (_super) {
        __extends(HttpClientConflictError, _super);
        function HttpClientConflictError(message) {
            var _this = _super.call(this, ReadableErrorCode.Conflict, message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientConflictError;
    }(BaseHttpClientError));
    exports.HttpClientConflictError = HttpClientConflictError;
    var HttpClientNotFoundError = /** @class */ (function (_super) {
        __extends(HttpClientNotFoundError, _super);
        function HttpClientNotFoundError(message) {
            var _this = _super.call(this, ReadableErrorCode.NotFound, message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientNotFoundError;
    }(BaseHttpClientError));
    exports.HttpClientNotFoundError = HttpClientNotFoundError;
    var HttpClientUnauthorizedError = /** @class */ (function (_super) {
        __extends(HttpClientUnauthorizedError, _super);
        function HttpClientUnauthorizedError(message) {
            var _this = _super.call(this, ReadableErrorCode.Unauthorized, message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientUnauthorizedError;
    }(BaseHttpClientError));
    exports.HttpClientUnauthorizedError = HttpClientUnauthorizedError;
    var HttpClientBadArgumentError = /** @class */ (function (_super) {
        __extends(HttpClientBadArgumentError, _super);
        function HttpClientBadArgumentError(message, fieldErrors) {
            var _this = _super.call(this, ReadableErrorCode.BadArgument, message) || this;
            _this.message = message;
            _this.fieldErrors = fieldErrors;
            console.log(fieldErrors);
            return _this;
        }
        return HttpClientBadArgumentError;
    }(BaseHttpClientError));
    exports.HttpClientBadArgumentError = HttpClientBadArgumentError;
    var HttpClientGeneralErrorError = /** @class */ (function (_super) {
        __extends(HttpClientGeneralErrorError, _super);
        function HttpClientGeneralErrorError(message) {
            var _this = _super.call(this, ReadableErrorCode.GeneralError, message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientGeneralErrorError;
    }(BaseHttpClientError));
    exports.HttpClientGeneralErrorError = HttpClientGeneralErrorError;
    var HttpClientForbiddenError = /** @class */ (function (_super) {
        __extends(HttpClientForbiddenError, _super);
        function HttpClientForbiddenError(message) {
            var _this = _super.call(this, ReadableErrorCode.Forbidden, message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientForbiddenError;
    }(BaseHttpClientError));
    exports.HttpClientForbiddenError = HttpClientForbiddenError;
    var HttpClientCommunicationError = /** @class */ (function (_super) {
        __extends(HttpClientCommunicationError, _super);
        function HttpClientCommunicationError(message) {
            var _this = _super.call(this, "", message) || this;
            _this.message = message;
            return _this;
        }
        return HttpClientCommunicationError;
    }(BaseHttpClientError));
    exports.HttpClientCommunicationError = HttpClientCommunicationError;
    var HttpClientServerFatalError = /** @class */ (function (_super) {
        __extends(HttpClientServerFatalError, _super);
        function HttpClientServerFatalError(httpCode, message) {
            var _this = _super.call(this, "", message) || this;
            _this.httpCode = httpCode;
            _this.message = message;
            return _this;
        }
        return HttpClientServerFatalError;
    }(BaseHttpClientError));
    exports.HttpClientServerFatalError = HttpClientServerFatalError;
    var ScheduleType = /** @class */ (function () {
        function ScheduleType() {
        }
        ScheduleType.NoSchedule = "NoSchedule";
        ScheduleType.OnceSchedule = "OnceSchedule";
        ScheduleType.HourlySchedule = "HourlySchedule";
        ScheduleType.DailySchedule = "DailySchedule";
        ScheduleType.ContinuousSchedule = "ContinuousSchedule";
        return ScheduleType;
    }());
    exports.ScheduleType = ScheduleType;
    var ParameterType = /** @class */ (function () {
        function ParameterType() {
        }
        ParameterType.Text = "Text";
        ParameterType.FilePath = "FilePath";
        ParameterType.Date = "Date";
        ParameterType.Calculated = "Calculated";
        ParameterType.FolderPath = "FolderPath";
        return ParameterType;
    }());
    exports.ParameterType = ParameterType;
    var Space = /** @class */ (function () {
        function Space() {
            this.spaceName = "";
            this.spaceNameLowerCase = "";
            this.accessRestriction = SpaceAccessRestriction.None;
            this.accessRestrictionDescription = "";
            this.taskAccess = SpaceTaskAccessMode.Disabled;
            this.taskAccessDescription = "";
            this.publicFolder = "";
            this.webFilesAccesMode = SpaceWebFilesAccessMode.Disabled;
            this.webFilesAccesModeDescription = "";
            this.repositoryFile = "";
        }
        Space.prototype.fromDto = function (dto) {
            this.spaceName = dto.spaceName;
            this.accessRestriction = dto.accessRestriction;
            this.taskAccess = dto.taskAccess;
            this.publicFolder = dto.publicFolder;
            this.webFilesAccesMode = dto.webFilesAccesMode;
            this.repositoryFile = dto.repositoryFile;
            this.accessRestrictionDescription = Space.GetSpaceAccessRestrictionText(dto.accessRestriction);
            this.taskAccessDescription = Space.GetTaskAccessDescription(dto.taskAccess);
            this.webFilesAccesModeDescription = Space.GetWebFilesAccessDescription(dto.webFilesAccesMode);
            this.spaceNameLowerCase = (dto.spaceName || "").toLocaleLowerCase();
            return this;
        };
        Space.GetSpaceAccessRestrictionText = function (spaceAccessRestriction) {
            switch (spaceAccessRestriction) {
                case SpaceAccessRestriction.None: return "No";
                case SpaceAccessRestriction.BasicPassword: return "Password";
                default: throw new Error(spaceAccessRestriction + " Not implemented");
            }
        };
        Space.GetWebFilesAccessDescription = function (webFilesAccesMode) {
            switch (webFilesAccesMode) {
                case SpaceWebFilesAccessMode.Disabled: return "Disabled";
                case SpaceWebFilesAccessMode.OnlyDownload: return "Only download";
                case SpaceWebFilesAccessMode.OnlyUpload: return "Only upload";
                case SpaceWebFilesAccessMode.FullAccess: return "Full access";
                default: throw new Error(webFilesAccesMode + " Not implemented");
            }
        };
        Space.GetTaskAccessDescription = function (taskAccessMode) {
            switch (taskAccessMode) {
                case SpaceTaskAccessMode.Disabled: return "Disabled";
                case SpaceTaskAccessMode.LockProject: return "Lock project";
                case SpaceTaskAccessMode.LockTask: return "Lock task";
                case SpaceTaskAccessMode.FullAccess: return "Full access";
                default: throw new Error(taskAccessMode + " Not implemented");
            }
        };
        return Space;
    }());
    exports.Space = Space;
});
//# sourceMappingURL=model.js.map