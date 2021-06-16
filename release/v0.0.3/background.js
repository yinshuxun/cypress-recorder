/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "943918902f11bc3b0637";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "background";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/background/index.js")(__webpack_require__.s = "./src/background/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../code-generator/pptr-actions */ \"./src/code-generator/pptr-actions.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar RecordingController = /*#__PURE__*/function () {\n  function RecordingController() {\n    _classCallCheck(this, RecordingController);\n\n    this._recording = [];\n    this._boundedMessageHandler = null;\n    this._boundedNavigationHandler = null;\n    this._boundedWaitHandler = null;\n    this._boundedAjaxHander = null;\n    this._badgeState = \"\";\n    this._isPaused = false;\n  }\n\n  _createClass(RecordingController, [{\n    key: \"boot\",\n    value: function boot() {\n      var _this = this;\n\n      chrome.extension.onConnect.addListener(function (port) {\n        console.log(\"12312312\");\n        port.onMessage.addListener(function (msg) {\n          chrome.extension.getBackgroundPage().console.log(\"boot msg\", msg);\n          if (msg.action && msg.action === \"start\") _this.start();\n          if (msg.action && msg.action === \"stop\") _this.stop();\n          if (msg.action && msg.action === \"cleanUp\") _this.cleanUp();\n          if (msg.action && msg.action === \"pause\") _this.pause();\n          if (msg.action && msg.action === \"unpause\") _this.unPause();\n        });\n      });\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var _this2 = this;\n\n      this.cleanUp(function () {\n        var that = _this2;\n        _this2._badgeState = \"rec\";\n\n        _this2.injectScript();\n\n        _this2._boundedMessageHandler = _this2.handleMessage.bind(_this2);\n        _this2._boundedNavigationHandler = _this2.handleNavigation.bind(_this2);\n        _this2._boundedWaitHandler = _this2.handleWait.bind(_this2); // 监听 ajax\n        // background.js\n\n        _this2.boundedAjaxHander();\n\n        chrome.runtime.onMessage.addListener(_this2._boundedMessageHandler);\n        chrome.webNavigation.onCompleted.addListener(_this2._boundedNavigationHandler);\n        chrome.webNavigation.onBeforeNavigate.addListener(_this2._boundedWaitHandler);\n        chrome.browserAction.setIcon({\n          path: \"./images/icon-green.png\"\n        });\n        chrome.browserAction.setBadgeText({\n          text: _this2._badgeState\n        });\n        chrome.browserAction.setBadgeBackgroundColor({\n          color: \"#FF0000\"\n        });\n      });\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      // console.debug('stop recording');\n      this._badgeState = this._recording.length > 0 ? \"1\" : \"\";\n      chrome.runtime.onMessage.removeListener(this._boundedMessageHandler);\n      chrome.webNavigation.onCompleted.removeListener(this._boundedNavigationHandler);\n      chrome.webNavigation.onBeforeNavigate.removeListener(this._boundedWaitHandler);\n      chrome.browserAction.setIcon({\n        path: \"./images/icon-black.png\"\n      });\n      chrome.browserAction.setBadgeText({\n        text: this._badgeState\n      });\n      chrome.browserAction.setBadgeBackgroundColor({\n        color: \"#45C8F1\"\n      });\n      chrome.storage.local.set({\n        recording: this._recording\n      }, function () {\n        console.debug(\"recording stored\");\n      });\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      // console.debug('pause');\n      this._badgeState = \"❚❚\";\n      chrome.browserAction.setBadgeText({\n        text: this._badgeState\n      });\n      this._isPaused = true;\n    }\n  }, {\n    key: \"unPause\",\n    value: function unPause() {\n      // console.debug('unpause');\n      this._badgeState = \"rec\";\n      chrome.browserAction.setBadgeText({\n        text: this._badgeState\n      });\n      this._isPaused = false;\n    }\n  }, {\n    key: \"cleanUp\",\n    value: function cleanUp(cb) {\n      // console.debug('cleanup');\n      this._recording = [];\n      chrome.browserAction.setBadgeText({\n        text: \"\"\n      });\n      chrome.storage.local.remove(\"recording\", function () {\n        console.debug(\"stored recording cleared\");\n        if (cb) cb();\n      });\n    }\n  }, {\n    key: \"recordCurrentUrl\",\n    value: function recordCurrentUrl(href, origin) {\n      // console.debug('recording goto* for:', href);\n      this.handleMessage({\n        selector: undefined,\n        value: undefined,\n        action: _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GOTO,\n        href: href,\n        origin: origin\n      });\n    }\n  }, {\n    key: \"recordCurrentViewportSize\",\n    value: function recordCurrentViewportSize(value) {\n      this.handleMessage({\n        selector: undefined,\n        value: value,\n        action: _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].VIEWPORT\n      });\n    }\n  }, {\n    key: \"recordNavigation\",\n    value: function recordNavigation(url) {\n      this.handleMessage({\n        selector: undefined,\n        value: undefined,\n        href: url,\n        action: _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].NAVIGATION\n      });\n    }\n  }, {\n    key: \"handleMessage\",\n    value: function handleMessage(msg, sender) {\n      // console.log('handleMessage', msg);\n      if (msg.control) return this.handleControlMessage(msg, sender); // to account for clicks etc. we need to record the frameId and url to later target the frame in playback\n\n      msg.frameId = sender ? sender.frameId : null;\n      msg.frameUrl = sender ? sender.url : null;\n\n      if (!this._isPaused) {\n        this._recording.push(msg);\n\n        chrome.storage.local.set({\n          recording: this._recording\n        }, function () {\n          console.debug(\"stored recording updated\");\n        });\n      }\n    }\n  }, {\n    key: \"handleControlMessage\",\n    value: function handleControlMessage(msg, sender) {\n      // console.debug('handleControlMessage', msg);\n      if (msg.control === \"event-recorder-started\") chrome.browserAction.setBadgeText({\n        text: this._badgeState\n      });\n      if (msg.control === \"get-viewport-size\") this.recordCurrentViewportSize(msg.coordinates);\n      if (msg.control === \"get-current-url\") this.recordCurrentUrl(msg.href, msg.origin);\n    }\n  }, {\n    key: \"handleNavigation\",\n    value: function handleNavigation(_ref) {\n      var frameId = _ref.frameId;\n      this.injectScript();\n\n      if (frameId === 0) {\n        var that = this;\n        chrome.tabs.query({\n          active: true,\n          currentWindow: true\n        }, function (tabs) {\n          that.recordNavigation(tabs[0].url);\n        });\n      }\n    } // yintest for ajax\n\n  }, {\n    key: \"boundedAjaxHander\",\n    value: function boundedAjaxHander() {// chrome.webRequest.onBeforeRequest.addListener(\n      //   (detail) => {\n      //     console.log(detail);\n      //     if ([\"POST\", \"PUT\", \"DELETE\"].includes(detail.method)) {\n      //       console.log(\"boundedAjaxHander\", detail);\n      //       this.handleMessage({\n      //         selector: undefined,\n      //         value: undefined,\n      //         action: pptrActions.REQUEST,\n      //         detail,\n      //       });\n      //     }\n      //   },\n      //   { urls: [\"<all_urls>\"] }\n      // );\n    }\n  }, {\n    key: \"handleWait\",\n    value: function handleWait() {\n      chrome.browserAction.setBadgeText({\n        text: \"wait\"\n      });\n    }\n  }, {\n    key: \"injectScript\",\n    value: function injectScript() {\n      chrome.tabs.executeScript({\n        file: \"content-script.js\",\n        allFrames: false\n      });\n    }\n  }]);\n\n  return RecordingController;\n}(); // console.debug('booting recording controller');\n\n\nwindow.recordingController = new RecordingController();\nwindow.recordingController.boot();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9pbmRleC5qcz9hYzI4Il0sIm5hbWVzIjpbIlJlY29yZGluZ0NvbnRyb2xsZXIiLCJfcmVjb3JkaW5nIiwiX2JvdW5kZWRNZXNzYWdlSGFuZGxlciIsIl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIiLCJfYm91bmRlZFdhaXRIYW5kbGVyIiwiX2JvdW5kZWRBamF4SGFuZGVyIiwiX2JhZGdlU3RhdGUiLCJfaXNQYXVzZWQiLCJjaHJvbWUiLCJleHRlbnNpb24iLCJvbkNvbm5lY3QiLCJhZGRMaXN0ZW5lciIsInBvcnQiLCJjb25zb2xlIiwibG9nIiwib25NZXNzYWdlIiwibXNnIiwiZ2V0QmFja2dyb3VuZFBhZ2UiLCJhY3Rpb24iLCJzdGFydCIsInN0b3AiLCJjbGVhblVwIiwicGF1c2UiLCJ1blBhdXNlIiwidGhhdCIsImluamVjdFNjcmlwdCIsImhhbmRsZU1lc3NhZ2UiLCJiaW5kIiwiaGFuZGxlTmF2aWdhdGlvbiIsImhhbmRsZVdhaXQiLCJib3VuZGVkQWpheEhhbmRlciIsInJ1bnRpbWUiLCJ3ZWJOYXZpZ2F0aW9uIiwib25Db21wbGV0ZWQiLCJvbkJlZm9yZU5hdmlnYXRlIiwiYnJvd3NlckFjdGlvbiIsInNldEljb24iLCJwYXRoIiwic2V0QmFkZ2VUZXh0IiwidGV4dCIsInNldEJhZGdlQmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJsZW5ndGgiLCJyZW1vdmVMaXN0ZW5lciIsInN0b3JhZ2UiLCJsb2NhbCIsInNldCIsInJlY29yZGluZyIsImRlYnVnIiwiY2IiLCJyZW1vdmUiLCJocmVmIiwib3JpZ2luIiwic2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsInBwdHJBY3Rpb25zIiwiR09UTyIsIlZJRVdQT1JUIiwidXJsIiwiTkFWSUdBVElPTiIsInNlbmRlciIsImNvbnRyb2wiLCJoYW5kbGVDb250cm9sTWVzc2FnZSIsImZyYW1lSWQiLCJmcmFtZVVybCIsInB1c2giLCJyZWNvcmRDdXJyZW50Vmlld3BvcnRTaXplIiwiY29vcmRpbmF0ZXMiLCJyZWNvcmRDdXJyZW50VXJsIiwidGFicyIsInF1ZXJ5IiwiYWN0aXZlIiwiY3VycmVudFdpbmRvdyIsInJlY29yZE5hdmlnYXRpb24iLCJleGVjdXRlU2NyaXB0IiwiZmlsZSIsImFsbEZyYW1lcyIsIndpbmRvdyIsInJlY29yZGluZ0NvbnRyb2xsZXIiLCJib290Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUVNQSxtQjtBQUNKLGlDQUFjO0FBQUE7O0FBQ1osU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLHNCQUFMLEdBQThCLElBQTlCO0FBQ0EsU0FBS0MseUJBQUwsR0FBaUMsSUFBakM7QUFDQSxTQUFLQyxtQkFBTCxHQUEyQixJQUEzQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDRDs7OztXQUVELGdCQUFPO0FBQUE7O0FBQ0xDLFlBQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsU0FBakIsQ0FBMkJDLFdBQTNCLENBQXVDLFVBQUNDLElBQUQsRUFBVTtBQUMvQ0MsZUFBTyxDQUFDQyxHQUFSLENBQVksVUFBWjtBQUNBRixZQUFJLENBQUNHLFNBQUwsQ0FBZUosV0FBZixDQUEyQixVQUFDSyxHQUFELEVBQVM7QUFDbENSLGdCQUFNLENBQUNDLFNBQVAsQ0FBaUJRLGlCQUFqQixHQUFxQ0osT0FBckMsQ0FBNkNDLEdBQTdDLENBQWlELFVBQWpELEVBQTZERSxHQUE3RDtBQUNBLGNBQUlBLEdBQUcsQ0FBQ0UsTUFBSixJQUFjRixHQUFHLENBQUNFLE1BQUosS0FBZSxPQUFqQyxFQUEwQyxLQUFJLENBQUNDLEtBQUw7QUFDMUMsY0FBSUgsR0FBRyxDQUFDRSxNQUFKLElBQWNGLEdBQUcsQ0FBQ0UsTUFBSixLQUFlLE1BQWpDLEVBQXlDLEtBQUksQ0FBQ0UsSUFBTDtBQUN6QyxjQUFJSixHQUFHLENBQUNFLE1B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QUEzQiIsImZpbGUiOiIuL3NyYy9iYWNrZ3JvdW5kL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBwdHJBY3Rpb25zIGZyb20gXCIuLi9jb2RlLWdlbmVyYXRvci9wcHRyLWFjdGlvbnNcIjtcblxuY2xhc3MgUmVjb3JkaW5nQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3JlY29yZGluZyA9IFtdO1xuICAgIHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlciA9IG51bGw7XG4gICAgdGhpcy5fYm91bmRlZE5hdmlnYXRpb25IYW5kbGVyID0gbnVsbDtcbiAgICB0aGlzLl9ib3VuZGVkV2FpdEhhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMuX2JvdW5kZWRBamF4SGFuZGVyID0gbnVsbDtcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gXCJcIjtcbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICB9XG5cbiAgYm9vdCgpIHtcbiAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcigocG9ydCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCIxMjMxMjMxMlwiKTtcbiAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbiAgICAgICAgY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpLmNvbnNvbGUubG9nKFwiYm9vdCBtc2dcIiwgbXNnKTtcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gXCJzdGFydFwiKSB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIGlmIChtc2cuYWN0aW9uICYmIG1zZy5hY3Rpb24gPT09IFwic3RvcFwiKSB0aGlzLnN0b3AoKTtcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gXCJjbGVhblVwXCIpIHRoaXMuY2xlYW5VcCgpO1xuICAgICAgICBpZiAobXNnLmFjdGlvbiAmJiBtc2cuYWN0aW9uID09PSBcInBhdXNlXCIpIHRoaXMucGF1c2UoKTtcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gXCJ1bnBhdXNlXCIpIHRoaXMudW5QYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmNsZWFuVXAoKCkgPT4ge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2JhZGdlU3RhdGUgPSBcInJlY1wiO1xuICAgICAgdGhpcy5pbmplY3RTY3JpcHQoKTtcblxuICAgICAgdGhpcy5fYm91bmRlZE1lc3NhZ2VIYW5kbGVyID0gdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZU5hdmlnYXRpb24uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuX2JvdW5kZWRXYWl0SGFuZGxlciA9IHRoaXMuaGFuZGxlV2FpdC5iaW5kKHRoaXMpO1xuXG4gICAgICAvLyDnm5HlkKwgYWpheFxuICAgICAgLy8gYmFja2dyb3VuZC5qc1xuXG4gICAgICB0aGlzLmJvdW5kZWRBamF4SGFuZGVyKCk7XG5cbiAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcih0aGlzLl9ib3VuZGVkTWVzc2FnZUhhbmRsZXIpO1xuICAgICAgY2hyb21lLndlYk5hdmlnYXRpb24ub25Db21wbGV0ZWQuYWRkTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlclxuICAgICAgKTtcbiAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUuYWRkTGlzdGVuZXIoXG4gICAgICAgIHRoaXMuX2JvdW5kZWRXYWl0SGFuZGxlclxuICAgICAgKTtcblxuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7IHBhdGg6IFwiLi9pbWFnZXMvaWNvbi1ncmVlbi5wbmdcIiB9KTtcbiAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IHRoaXMuX2JhZGdlU3RhdGUgfSk7XG4gICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7IGNvbG9yOiBcIiNGRjAwMDBcIiB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgLy8gY29uc29sZS5kZWJ1Zygnc3RvcCByZWNvcmRpbmcnKTtcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gdGhpcy5fcmVjb3JkaW5nLmxlbmd0aCA+IDAgPyBcIjFcIiA6IFwiXCI7XG5cbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIodGhpcy5fYm91bmRlZE1lc3NhZ2VIYW5kbGVyKTtcbiAgICBjaHJvbWUud2ViTmF2aWdhdGlvbi5vbkNvbXBsZXRlZC5yZW1vdmVMaXN0ZW5lcihcbiAgICAgIHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlclxuICAgICk7XG4gICAgY2hyb21lLndlYk5hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZS5yZW1vdmVMaXN0ZW5lcihcbiAgICAgIHRoaXMuX2JvdW5kZWRXYWl0SGFuZGxlclxuICAgICk7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHsgcGF0aDogXCIuL2ltYWdlcy9pY29uLWJsYWNrLnBuZ1wiIH0pO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IHRoaXMuX2JhZGdlU3RhdGUgfSk7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjNDVDOEYxXCIgfSk7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyByZWNvcmRpbmc6IHRoaXMuX3JlY29yZGluZyB9LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwicmVjb3JkaW5nIHN0b3JlZFwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoJ3BhdXNlJyk7XG4gICAgdGhpcy5fYmFkZ2VTdGF0ZSA9IFwi4p2a4p2aXCI7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KTtcbiAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XG4gIH1cblxuICB1blBhdXNlKCkge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoJ3VucGF1c2UnKTtcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gXCJyZWNcIjtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlIH0pO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gIH1cblxuICBjbGVhblVwKGNiKSB7XG4gICAgLy8gY29uc29sZS5kZWJ1ZygnY2xlYW51cCcpO1xuICAgIHRoaXMuX3JlY29yZGluZyA9IFtdO1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IFwiXCIgfSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFwicmVjb3JkaW5nXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJzdG9yZWQgcmVjb3JkaW5nIGNsZWFyZWRcIik7XG4gICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfSk7XG4gIH1cblxuICByZWNvcmRDdXJyZW50VXJsKGhyZWYsIG9yaWdpbikge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoJ3JlY29yZGluZyBnb3RvKiBmb3I6JywgaHJlZik7XG4gICAgdGhpcy5oYW5kbGVNZXNzYWdlKHtcbiAgICAgIHNlbGVjdG9yOiB1bmRlZmluZWQsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgYWN0aW9uOiBwcHRyQWN0aW9ucy5HT1RPLFxuICAgICAgaHJlZixcbiAgICAgIG9yaWdpbixcbiAgICB9KTtcbiAgfVxuXG4gIHJlY29yZEN1cnJlbnRWaWV3cG9ydFNpemUodmFsdWUpIHtcbiAgICB0aGlzLmhhbmRsZU1lc3NhZ2Uoe1xuICAgICAgc2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgICAgIHZhbHVlLFxuICAgICAgYWN0aW9uOiBwcHRyQWN0aW9ucy5WSUVXUE9SVCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlY29yZE5hdmlnYXRpb24odXJsKSB7XG4gICAgdGhpcy5oYW5kbGVNZXNzYWdlKHtcbiAgICAgIHNlbGVjdG9yOiB1bmRlZmluZWQsXG4gICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgaHJlZjogdXJsLFxuICAgICAgYWN0aW9uOiBwcHRyQWN0aW9ucy5OQVZJR0FUSU9OLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTWVzc2FnZShtc2csIHNlbmRlcikge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNZXNzYWdlJywgbXNnKTtcbiAgICBpZiAobXNnLmNvbnRyb2wpIHJldHVybiB0aGlzLmhhbmRsZUNvbnRyb2xNZXNzYWdlKG1zZywgc2VuZGVyKTtcblxuICAgIC8vIHRvIGFjY291bnQgZm9yIGNsaWNrcyBldGMuIHdlIG5lZWQgdG8gcmVjb3JkIHRoZSBmcmFtZUlkIGFuZCB1cmwgdG8gbGF0ZXIgdGFyZ2V0IHRoZSBmcmFtZSBpbiBwbGF5YmFja1xuICAgIG1zZy5mcmFtZUlkID0gc2VuZGVyID8gc2VuZGVyLmZyYW1lSWQgOiBudWxsO1xuICAgIG1zZy5mcmFtZVVybCA9IHNlbmRlciA/IHNlbmRlci51cmwgOiBudWxsO1xuXG4gICAgaWYgKCF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgdGhpcy5fcmVjb3JkaW5nLnB1c2gobXNnKTtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHJlY29yZGluZzogdGhpcy5fcmVjb3JkaW5nIH0sICgpID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcInN0b3JlZCByZWNvcmRpbmcgdXBkYXRlZFwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbnRyb2xNZXNzYWdlKG1zZywgc2VuZGVyKSB7XG4gICAgLy8gY29uc29sZS5kZWJ1ZygnaGFuZGxlQ29udHJvbE1lc3NhZ2UnLCBtc2cpO1xuICAgIGlmIChtc2cuY29udHJvbCA9PT0gXCJldmVudC1yZWNvcmRlci1zdGFydGVkXCIpXG4gICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlIH0pO1xuICAgIGlmIChtc2cuY29udHJvbCA9PT0gXCJnZXQtdmlld3BvcnQtc2l6ZVwiKVxuICAgICAgdGhpcy5yZWNvcmRDdXJyZW50Vmlld3BvcnRTaXplKG1zZy5jb29yZGluYXRlcyk7XG4gICAgaWYgKG1zZy5jb250cm9sID09PSBcImdldC1jdXJyZW50LXVybFwiKVxuICAgICAgdGhpcy5yZWNvcmRDdXJyZW50VXJsKG1zZy5ocmVmLCBtc2cub3JpZ2luKTtcbiAgfVxuXG4gIGhhbmRsZU5hdmlnYXRpb24oeyBmcmFtZUlkIH0pIHtcbiAgICB0aGlzLmluamVjdFNjcmlwdCgpO1xuICAgIGlmIChmcmFtZUlkID09PSAwKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgIHRoYXQucmVjb3JkTmF2aWdhdGlvbih0YWJzWzBdLnVybCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyB5aW50ZXN0IGZvciBhamF4XG4gIGJvdW5kZWRBamF4SGFuZGVyKCkge1xuICAgIC8vIGNocm9tZS53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5hZGRMaXN0ZW5lcihcbiAgICAvLyAgIChkZXRhaWwpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZGV0YWlsKTtcbiAgICAvLyAgICAgaWYgKFtcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIl0uaW5jbHVkZXMoZGV0YWlsLm1ldGhvZCkpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImJvdW5kZWRBamF4SGFuZGVyXCIsIGRldGFpbCk7XG4gICAgLy8gICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKHtcbiAgICAvLyAgICAgICAgIHNlbGVjdG9yOiB1bmRlZmluZWQsXG4gICAgLy8gICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgIC8vICAgICAgICAgYWN0aW9uOiBwcHRyQWN0aW9ucy5SRVFVRVNULFxuICAgIC8vICAgICAgICAgZGV0YWlsLFxuICAgIC8vICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9LFxuICAgIC8vICAgeyB1cmxzOiBbXCI8YWxsX3VybHM+XCJdIH1cbiAgICAvLyApO1xuICB9XG5cbiAgaGFuZGxlV2FpdCgpIHtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBcIndhaXRcIiB9KTtcbiAgfVxuXG4gIGluamVjdFNjcmlwdCgpIHtcbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogXCJjb250ZW50LXNjcmlwdC5qc1wiLCBhbGxGcmFtZXM6IGZhbHNlIH0pO1xuICB9XG59XG5cbi8vIGNvbnNvbGUuZGVidWcoJ2Jvb3RpbmcgcmVjb3JkaW5nIGNvbnRyb2xsZXInKTtcbndpbmRvdy5yZWNvcmRpbmdDb250cm9sbGVyID0gbmV3IFJlY29yZGluZ0NvbnRyb2xsZXIoKTtcbndpbmRvdy5yZWNvcmRpbmdDb250cm9sbGVyLmJvb3QoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/background/index.js\n");

/***/ }),

/***/ "./src/code-generator/pptr-actions.js":
/*!********************************************!*\
  !*** ./src/code-generator/pptr-actions.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  GOTO: \"goto*\",\n  VIEWPORT: \"viewport*\",\n  WAITFORSELECTOR: \"waitForSelector*\",\n  NAVIGATION: \"navigation*\",\n  NAVIGATE: \"navigate*\",\n  NAVIGATION_PROMISE: \"navigation-promise*\",\n  FRAME_SET: \"frame-set*\",\n  REQUEST: \"request*\"\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zLmpzP2Y3NTUiXSwibmFtZXMiOlsiR09UTyIsIlZJRVdQT1JUIiwiV0FJVEZPUlNFTEVDVE9SIiwiTkFWSUdBVElPTiIsIk5BVklHQVRFIiwiTkFWSUdBVElPTl9QUk9NSVNFIiwiRlJBTUVfU0VUIiwiUkVRVUVTVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZTtBQUNiQSxNQUFJLEVBQUUsT0FETztBQUViQyxVQUFRLEVBQUUsV0FGRztBQUdiQyxpQkFBZSxFQUFFLGtCQUhKO0FBSWJDLFlBQVUsRUFBRSxhQUpDO0FBS2JDLFVBQVEsRUFBRSxXQUxHO0FBTWJDLG9CQUFrQixFQUFFLHFCQU5QO0FBT2JDLFdBQVMsRUFBRSxZQVBFO0FBUWJDLFNBQU8sRUFBRTtBQVJJLENBQWYiLCJmaWxlIjoiLi9zcmMvY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBHT1RPOiBcImdvdG8qXCIsXG4gIFZJRVdQT1JUOiBcInZpZXdwb3J0KlwiLFxuICBXQUlURk9SU0VMRUNUT1I6IFwid2FpdEZvclNlbGVjdG9yKlwiLFxuICBOQVZJR0FUSU9OOiBcIm5hdmlnYXRpb24qXCIsXG4gIE5BVklHQVRFOiBcIm5hdmlnYXRlKlwiLFxuICBOQVZJR0FUSU9OX1BST01JU0U6IFwibmF2aWdhdGlvbi1wcm9taXNlKlwiLFxuICBGUkFNRV9TRVQ6IFwiZnJhbWUtc2V0KlwiLFxuICBSRVFVRVNUOiBcInJlcXVlc3QqXCIsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/code-generator/pptr-actions.js\n");

/***/ })

/******/ });