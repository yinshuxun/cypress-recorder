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
/******/ 			var chunkId = "content-script";
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
/******/ 	return hotCreateRequire("./src/content-scripts/index.js")(__webpack_require__.s = "./src/content-scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@medv/finder/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@medv/finder/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __values = (this && this.__values) || function (o) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator], i = 0;\n    if (m) return m.call(o);\n    return {\n        next: function () {\n            if (o && i >= o.length) o = void 0;\n            return { value: o && o[i++], done: !o };\n        }\n    };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cssesc = __webpack_require__(/*! cssesc */ \"./node_modules/@medv/finder/node_modules/cssesc/cssesc.js\");\nvar Limit;\n(function (Limit) {\n    Limit[Limit[\"All\"] = 0] = \"All\";\n    Limit[Limit[\"Two\"] = 1] = \"Two\";\n    Limit[Limit[\"One\"] = 2] = \"One\";\n})(Limit || (Limit = {}));\nvar config;\nvar rootDocument;\nfunction default_1(input, options) {\n    if (input.nodeType !== Node.ELEMENT_NODE) {\n        throw new Error(\"Can't generate CSS selector for non-element node type.\");\n    }\n    if ('html' === input.tagName.toLowerCase()) {\n        return 'html';\n    }\n    var defaults = {\n        root: document.body,\n        idName: function (name) { return true; },\n        className: function (name) { return true; },\n        tagName: function (name) { return true; },\n        attr: function (name, value) { return false; },\n        seedMinLength: 1,\n        optimizedMinLength: 2,\n        threshold: 1000,\n        maxNumberOfTries: 10000,\n    };\n    config = __assign({}, defaults, options);\n    rootDocument = findRootDocument(config.root, defaults);\n    var path = bottomUpSearch(input, Limit.All, function () {\n        return bottomUpSearch(input, Limit.Two, function () {\n            return bottomUpSearch(input, Limit.One);\n        });\n    });\n    if (path) {\n        var optimized = sort(optimize(path, input));\n        if (optimized.length > 0) {\n            path = optimized[0];\n        }\n        return selector(path);\n    }\n    else {\n        throw new Error(\"Selector was not found.\");\n    }\n}\nexports.default = default_1;\nfunction findRootDocument(rootNode, defaults) {\n    if (rootNode.nodeType === Node.DOCUMENT_NODE) {\n        return rootNode;\n    }\n    if (rootNode === defaults.root) {\n        return rootNode.ownerDocument;\n    }\n    return rootNode;\n}\nfunction bottomUpSearch(input, limit, fallback) {\n    var path = null;\n    var stack = [];\n    var current = input;\n    var i = 0;\n    var _loop_1 = function () {\n        var level = maybe(id(current)) || maybe.apply(void 0, attr(current)) || maybe.apply(void 0, classNames(current)) || maybe(tagName(current)) || [any()];\n        var nth = index(current);\n        if (limit === Limit.All) {\n            if (nth) {\n                level = level.concat(level.filter(dispensableNth).map(function (node) { return nthChild(node, nth); }));\n            }\n        }\n        else if (limit === Limit.Two) {\n            level = level.slice(0, 1);\n            if (nth) {\n                level = level.concat(level.filter(dispensableNth).map(function (node) { return nthChild(node, nth); }));\n            }\n        }\n        else if (limit === Limit.One) {\n            var node = (level = level.slice(0, 1))[0];\n            if (nth && dispensableNth(node)) {\n                level = [nthChild(node, nth)];\n            }\n        }\n        for (var _i = 0, level_1 = level; _i < level_1.length; _i++) {\n            var node = level_1[_i];\n            node.level = i;\n        }\n        stack.push(level);\n        if (stack.length >= config.seedMinLength) {\n            path = findUniquePath(stack, fallback);\n            if (path) {\n                return \"break\";\n            }\n        }\n        current = current.parentElement;\n        i++;\n    };\n    while (current && current !== config.root.parentElement) {\n        var state_1 = _loop_1();\n        if (state_1 === \"break\")\n            break;\n    }\n    if (!path) {\n        path = findUniquePath(stack, fallback);\n    }\n    return path;\n}\nfunction findUniquePath(stack, fallback) {\n    var paths = sort(combinations(stack));\n    if (paths.length > config.threshold) {\n        return fallback ? fallback() : null;\n    }\n    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {\n        var candidate = paths_1[_i];\n        if (unique(candidate)) {\n            return candidate;\n        }\n    }\n    return null;\n}\nfunction selector(path) {\n    var node = path[0];\n    var query = node.name;\n    for (var i = 1; i < path.length; i++) {\n        var level = path[i].level || 0;\n        if (node.level === level - 1) {\n            query = path[i].name + \" > \" + query;\n        }\n        else {\n            query = path[i].name + \" \" + query;\n        }\n        node = path[i];\n    }\n    return query;\n}\nfunction penalty(path) {\n    return path.map(function (node) { return node.penalty; }).reduce(function (acc, i) { return acc + i; }, 0);\n}\nfunction unique(path) {\n    switch (rootDocument.querySelectorAll(selector(path)).length) {\n        case 0:\n            throw new Error(\"Can't select any node with this selector: \" + selector(path));\n        case 1:\n            return true;\n        default:\n            return false;\n    }\n}\nfunction id(input) {\n    var elementId = input.getAttribute('id');\n    if (elementId && config.idName(elementId)) {\n        return {\n            name: '#' + cssesc(elementId, { isIdentifier: true }),\n            penalty: 0,\n        };\n    }\n    return null;\n}\nfunction attr(input) {\n    var attrs = Array.from(input.attributes).filter(function (attr) { return config.attr(attr.name, attr.value); });\n    return attrs.map(function (attr) { return ({\n        name: '[' + cssesc(attr.name, { isIdentifier: true }) + '=\"' + cssesc(attr.value) + '\"]',\n        penalty: 0.5\n    }); });\n}\nfunction classNames(input) {\n    var names = Array.from(input.classList)\n        .filter(config.className);\n    return names.map(function (name) { return ({\n        name: '.' + cssesc(name, { isIdentifier: true }),\n        penalty: 1\n    }); });\n}\nfunction tagName(input) {\n    var name = input.tagName.toLowerCase();\n    if (config.tagName(name)) {\n        return {\n            name: name,\n            penalty: 2\n        };\n    }\n    return null;\n}\nfunction any() {\n    return {\n        name: '*',\n        penalty: 3\n    };\n}\nfunction index(input) {\n    var parent = input.parentNode;\n    if (!parent) {\n        return null;\n    }\n    var child = parent.firstChild;\n    if (!child) {\n        return null;\n    }\n    var i = 0;\n    while (child) {\n        if (child.nodeType === Node.ELEMENT_NODE) {\n            i++;\n        }\n        if (child === input) {\n            break;\n        }\n        child = child.nextSibling;\n    }\n    return i;\n}\nfunction nthChild(node, i) {\n    return {\n        name: node.name + (\":nth-child(\" + i + \")\"),\n        penalty: node.penalty + 1\n    };\n}\nfunction dispensableNth(node) {\n    return node.name !== 'html' && !node.name.startsWith('#');\n}\nfunction maybe() {\n    var level = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        level[_i] = arguments[_i];\n    }\n    var list = level.filter(notEmpty);\n    if (list.length > 0) {\n        return list;\n    }\n    return null;\n}\nfunction notEmpty(value) {\n    return value !== null && value !== undefined;\n}\nfunction combinations(stack, path) {\n    var _i, _a, node;\n    if (path === void 0) { path = []; }\n    return __generator(this, function (_b) {\n        switch (_b.label) {\n            case 0:\n                if (!(stack.length > 0)) return [3 /*break*/, 5];\n                _i = 0, _a = stack[0];\n                _b.label = 1;\n            case 1:\n                if (!(_i < _a.length)) return [3 /*break*/, 4];\n                node = _a[_i];\n                return [5 /*yield**/, __values(combinations(stack.slice(1, stack.length), path.concat(node)))];\n            case 2:\n                _b.sent();\n                _b.label = 3;\n            case 3:\n                _i++;\n                return [3 /*break*/, 1];\n            case 4: return [3 /*break*/, 7];\n            case 5: return [4 /*yield*/, path];\n            case 6:\n                _b.sent();\n                _b.label = 7;\n            case 7: return [2 /*return*/];\n        }\n    });\n}\nfunction sort(paths) {\n    return Array.from(paths).sort(function (a, b) { return penalty(a) - penalty(b); });\n}\nfunction optimize(path, input, scope) {\n    var i, newPath, newPathKey;\n    if (scope === void 0) { scope = { counter: 0, visited: new Map() }; }\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                if (!(path.length > 2 && path.length > config.optimizedMinLength)) return [3 /*break*/, 5];\n                i = 1;\n                _a.label = 1;\n            case 1:\n                if (!(i < path.length - 1)) return [3 /*break*/, 5];\n                if (scope.counter > config.maxNumberOfTries) {\n                    return [2 /*return*/]; // Okay At least I tried!\n                }\n                scope.counter += 1;\n                newPath = path.slice();\n                newPath.splice(i, 1);\n                newPathKey = selector(newPath);\n                if (scope.visited.has(newPathKey)) {\n                    return [2 /*return*/];\n                }\n                if (!(unique(newPath) && same(newPath, input))) return [3 /*break*/, 4];\n                return [4 /*yield*/, newPath];\n            case 2:\n                _a.sent();\n                scope.visited.set(newPathKey, true);\n                return [5 /*yield**/, __values(optimize(newPath, input, scope))];\n            case 3:\n                _a.sent();\n                _a.label = 4;\n            case 4:\n                i++;\n                return [3 /*break*/, 1];\n            case 5: return [2 /*return*/];\n        }\n    });\n}\nfunction same(path, input) {\n    return rootDocument.querySelector(selector(path)) === input;\n}\n//# sourceMappingURL=index.js.map\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1lZHYvZmluZGVyL2Rpc3QvaW5kZXguanM/NDgyMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDZCQUE2QiwwQkFBMEIsYUFBYSxFQUFFLHFCQUFxQjtBQUN4RyxnQkFBZ0IscURBQXFELG9FQUFvRSxhQUFhLEVBQUU7QUFDeEosc0JBQXNCLHNCQUFzQixxQkFBcUIsR0FBRztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsa0NBQWtDLFNBQVM7QUFDM0Msa0NBQWtDLFdBQVcsVUFBVTtBQUN2RCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBLDZHQUE2RyxPQUFPLFVBQVU7QUFDOUgsZ0ZBQWdGLGlCQUFpQixPQUFPO0FBQ3hHLHdEQUF3RCxnQkFBZ0IsUUFBUSxPQUFPO0FBQ3ZGLDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLE9BQU87QUFDckY7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsWUFBWSxhQUFhLE9BQU8sRUFBRSxVQUFVLFdBQVc7QUFDaEUsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMseUVBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsYUFBYSxFQUFFO0FBQ2hELG9DQUFvQyxhQUFhLEVBQUU7QUFDbkQsa0NBQWtDLGFBQWEsRUFBRTtBQUNqRCxzQ0FBc0MsY0FBYyxF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c291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNzc2VzYyA9IHJlcXVpcmUoXCJjc3Nlc2NcIik7XG52YXIgTGltaXQ7XG4oZnVuY3Rpb24gKExpbWl0KSB7XG4gICAgTGltaXRbTGltaXRbXCJBbGxcIl0gPSAwXSA9IFwiQWxsXCI7XG4gICAgTGltaXRbTGltaXRbXCJUd29cIl0gPSAxXSA9IFwiVHdvXCI7XG4gICAgTGltaXRbTGltaXRbXCJPbmVcIl0gPSAyXSA9IFwiT25lXCI7XG59KShMaW1pdCB8fCAoTGltaXQgPSB7fSkpO1xudmFyIGNvbmZpZztcbnZhciByb290RG9jdW1lbnQ7XG5mdW5jdGlvbiBkZWZhdWx0XzEoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoaW5wdXQubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGdlbmVyYXRlIENTUyBzZWxlY3RvciBmb3Igbm9uLWVsZW1lbnQgbm9kZSB0eXBlLlwiKTtcbiAgICB9XG4gICAgaWYgKCdodG1sJyA9PT0gaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJldHVybiAnaHRtbCc7XG4gICAgfVxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgcm9vdDogZG9jdW1lbnQuYm9keSxcbiAgICAgICAgaWROYW1lOiBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgY2xhc3NOYW1lOiBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgdGFnTmFtZTogZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICAgIGF0dHI6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgIHNlZWRNaW5MZW5ndGg6IDEsXG4gICAgICAgIG9wdGltaXplZE1pbkxlbmd0aDogMixcbiAgICAgICAgdGhyZXNob2xkOiAxMDAwLFxuICAgICAgICBtYXhOdW1iZXJPZlRyaWVzOiAxMDAwMCxcbiAgICB9O1xuICAgIGNvbmZpZyA9IF9fYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgcm9vdERvY3VtZW50ID0gZmluZFJvb3REb2N1bWVudChjb25maWcucm9vdCwgZGVmYXVsdHMpO1xuICAgIHZhciBwYXRoID0gYm90dG9tVXBTZWFyY2goaW5wdXQsIExpbWl0LkFsbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYm90dG9tVXBTZWFyY2goaW5wdXQsIExpbWl0LlR3bywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGJvdHRvbVVwU2VhcmNoKGlucHV0LCBMaW1pdC5PbmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocGF0aCkge1xuICAgICAgICB2YXIgb3B0aW1pemVkID0gc29ydChvcHRpbWl6ZShwYXRoLCBpbnB1dCkpO1xuICAgICAgICBpZiAob3B0aW1pemVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBhdGggPSBvcHRpbWl6ZWRbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yKHBhdGgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VsZWN0b3Igd2FzIG5vdCBmb3VuZC5cIik7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuZnVuY3Rpb24gZmluZFJvb3REb2N1bWVudChyb290Tm9kZSwgZGVmYXVsdHMpIHtcbiAgICBpZiAocm9vdE5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkge1xuICAgICAgICByZXR1cm4gcm9vdE5vZGU7XG4gICAgfVxuICAgIGlmIChyb290Tm9kZSA9PT0gZGVmYXVsdHMucm9vdCkge1xuICAgICAgICByZXR1cm4gcm9vdE5vZGUub3duZXJEb2N1bWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJvb3ROb2RlO1xufVxuZnVuY3Rpb24gYm90dG9tVXBTZWFyY2goaW5wdXQsIGxpbWl0LCBmYWxsYmFjaykge1xuICAgIHZhciBwYXRoID0gbnVsbDtcbiAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICB2YXIgY3VycmVudCA9IGlucHV0O1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxldmVsID0gbWF5YmUoaWQoY3VycmVudCkpIHx8IG1heWJlLmFwcGx5KHZvaWQgMCwgYXR0cihjdXJyZW50KSkgfHwgbWF5YmUuYXBwbHkodm9pZCAwLCBjbGFzc05hbWVzKGN1cnJlbnQpKSB8fCBtYXliZSh0YWdOYW1lKGN1cnJlbnQpKSB8fCBbYW55KCldO1xuICAgICAgICB2YXIgbnRoID0gaW5kZXgoY3VycmVudCk7XG4gICAgICAgIGlmIChsaW1pdCA9PT0gTGltaXQuQWxsKSB7XG4gICAgICAgICAgICBpZiAobnRoKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgPSBsZXZlbC5jb25jYXQobGV2ZWwuZmlsdGVyKGRpc3BlbnNhYmxlTnRoKS5tYXAoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG50aENoaWxkKG5vZGUsIG50aCk7IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsaW1pdCA9PT0gTGltaXQuVHdvKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGxldmVsLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgaWYgKG50aCkge1xuICAgICAgICAgICAgICAgIGxldmVsID0gbGV2ZWwuY29uY2F0KGxldmVsLmZpbHRlcihkaXNwZW5zYWJsZU50aCkubWFwKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBudGhDaGlsZChub2RlLCBudGgpOyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGltaXQgPT09IExpbWl0Lk9uZSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSAobGV2ZWwgPSBsZXZlbC5zbGljZSgwLCAxKSlbMF07XG4gICAgICAgICAgICBpZiAobnRoICYmIGRpc3BlbnNhYmxlTnRoKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgPSBbbnRoQ2hpbGQobm9kZSwgbnRoKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBsZXZlbF8xID0gbGV2ZWw7IF9pIDwgbGV2ZWxfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbGV2ZWxfMVtfaV07XG4gICAgICAgICAgICBub2RlLmxldmVsID0gaTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5wdXNoKGxldmVsKTtcbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+PSBjb25maWcuc2VlZE1pbkxlbmd0aCkge1xuICAgICAgICAgICAgcGF0aCA9IGZpbmRVbmlxdWVQYXRoKHN0YWNrLCBmYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaSsrO1xuICAgIH07XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gY29uZmlnLnJvb3QucGFyZW50RWxlbWVudCkge1xuICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzEoKTtcbiAgICAgICAgaWYgKHN0YXRlXzEgPT09IFwiYnJlYWtcIilcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgcGF0aCA9IGZpbmRVbmlxdWVQYXRoKHN0YWNrLCBmYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gZmluZFVuaXF1ZVBhdGgoc3RhY2ssIGZhbGxiYWNrKSB7XG4gICAgdmFyIHBhdGhzID0gc29ydChjb21iaW5hdGlvbnMoc3RhY2spKTtcbiAgICBpZiAocGF0aHMubGVuZ3RoID4gY29uZmlnLnRocmVzaG9sZCkge1xuICAgICAgICByZXR1cm4gZmFsbGJhY2sgPyBmYWxsYmFjaygpIDogbnVsbDtcbiAgICB9XG4gICAgZm9yICh2YXIgX2kgPSAwLCBwYXRoc18xID0gcGF0aHM7IF9pIDwgcGF0aHNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IHBhdGhzXzFbX2ldO1xuICAgICAgICBpZiAodW5pcXVlKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBzZWxlY3RvcihwYXRoKSB7XG4gICAgdmFyIG5vZGUgPSBwYXRoWzBdO1xuICAgIHZhciBxdWVyeSA9IG5vZGUubmFtZTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxldmVsID0gcGF0aFtpXS5sZXZlbCB8fCAwO1xuICAgICAgICBpZiAobm9kZS5sZXZlbCA9PT0gbGV2ZWwgLSAxKSB7XG4gICAgICAgICAgICBxdWVyeSA9IHBhdGhbaV0ubmFtZSArIFwiID4gXCIgKyBxdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gcGF0aFtpXS5uYW1lICsgXCIgXCIgKyBxdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gcGF0aFtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xufVxuZnVuY3Rpb24gcGVuYWx0eShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGgubWFwKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLnBlbmFsdHk7IH0pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBpKSB7IHJldHVybiBhY2MgKyBpOyB9LCAwKTtcbn1cbmZ1bmN0aW9uIHVuaXF1ZShwYXRoKSB7XG4gICAgc3dpdGNoIChyb290RG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcihwYXRoKSkubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNlbGVjdCBhbnkgbm9kZSB3aXRoIHRoaXMgc2VsZWN0b3I6IFwiICsgc2VsZWN0b3IocGF0aCkpO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpZChpbnB1dCkge1xuICAgIHZhciBlbGVtZW50SWQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaWYgKGVsZW1lbnRJZCAmJiBjb25maWcuaWROYW1lKGVsZW1lbnRJZCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6ICcjJyArIGNzc2VzYyhlbGVtZW50SWQsIHsgaXNJZGVudGlmaWVyOiB0cnVlIH0pLFxuICAgICAgICAgICAgcGVuYWx0eTogMCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBhdHRyKGlucHV0KSB7XG4gICAgdmFyIGF0dHJzID0gQXJyYXkuZnJvbShpbnB1dC5hdHRyaWJ1dGVzKS5maWx0ZXIoZnVuY3Rpb24gKGF0dHIpIHsgcmV0dXJuIGNvbmZpZy5hdHRyKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7IH0pO1xuICAgIHJldHVybiBhdHRycy5tYXAoZnVuY3Rpb24gKGF0dHIpIHsgcmV0dXJuICh7XG4gICAgICAgIG5hbWU6ICdbJyArIGNzc2VzYyhhdHRyLm5hbWUsIHsgaXNJZGVudGlmaWVyOiB0cnVlIH0pICsgJz1cIicgKyBjc3Nlc2MoYXR0ci52YWx1ZSkgKyAnXCJdJyxcbiAgICAgICAgcGVuYWx0eTogMC41XG4gICAgfSk7IH0pO1xufVxuZnVuY3Rpb24gY2xhc3NOYW1lcyhpbnB1dCkge1xuICAgIHZhciBuYW1lcyA9IEFycmF5LmZyb20oaW5wdXQuY2xhc3NMaXN0KVxuICAgICAgICAuZmlsdGVyKGNvbmZpZy5jbGFzc05hbWUpO1xuICAgIHJldHVybiBuYW1lcy5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICh7XG4gICAgICAgIG5hbWU6ICcuJyArIGNzc2VzYyhuYW1lLCB7IGlzSWRlbnRpZmllcjogdHJ1ZSB9KSxcbiAgICAgICAgcGVuYWx0eTogMVxuICAgIH0pOyB9KTtcbn1cbmZ1bmN0aW9uIHRhZ05hbWUoaW5wdXQpIHtcbiAgICB2YXIgbmFtZSA9IGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29uZmlnLnRhZ05hbWUobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBwZW5hbHR5OiAyXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gYW55KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICcqJyxcbiAgICAgICAgcGVuYWx0eTogM1xuICAgIH07XG59XG5mdW5jdGlvbiBpbmRleChpbnB1dCkge1xuICAgIHZhciBwYXJlbnQgPSBpbnB1dC5wYXJlbnROb2RlO1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgY2hpbGQgPSBwYXJlbnQuZmlyc3RDaGlsZDtcbiAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGQgPT09IGlucHV0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn1cbmZ1bmN0aW9uIG50aENoaWxkKG5vZGUsIGkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBub2RlLm5hbWUgKyAoXCI6bnRoLWNoaWxkKFwiICsgaSArIFwiKVwiKSxcbiAgICAgICAgcGVuYWx0eTogbm9kZS5wZW5hbHR5ICsgMVxuICAgIH07XG59XG5mdW5jdGlvbiBkaXNwZW5zYWJsZU50aChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubmFtZSAhPT0gJ2h0bWwnICYmICFub2RlLm5hbWUuc3RhcnRzV2l0aCgnIycpO1xufVxuZnVuY3Rpb24gbWF5YmUoKSB7XG4gICAgdmFyIGxldmVsID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgbGV2ZWxbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGxpc3QgPSBsZXZlbC5maWx0ZXIobm90RW1wdHkpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gbm90RW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNvbWJpbmF0aW9ucyhzdGFjaywgcGF0aCkge1xuICAgIHZhciBfaSwgX2EsIG5vZGU7XG4gICAgaWYgKHBhdGggPT09IHZvaWQgMCkgeyBwYXRoID0gW107IH1cbiAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoIShzdGFjay5sZW5ndGggPiAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgX2kgPSAwLCBfYSA9IHN0YWNrWzBdO1xuICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIShfaSA8IF9hLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgIG5vZGUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFs1IC8qeWllbGQqKi8sIF9fdmFsdWVzKGNvbWJpbmF0aW9ucyhzdGFjay5zbGljZSgxLCBzdGFjay5sZW5ndGgpLCBwYXRoLmNvbmNhdChub2RlKSkpXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9pKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xuICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQgLyp5aWVsZCovLCBwYXRoXTtcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgX2IubGFiZWwgPSA3O1xuICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNvcnQocGF0aHMpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXRocykuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gcGVuYWx0eShhKSAtIHBlbmFsdHkoYik7IH0pO1xufVxuZnVuY3Rpb24gb3B0aW1pemUocGF0aCwgaW5wdXQsIHNjb3BlKSB7XG4gICAgdmFyIGksIG5ld1BhdGgsIG5ld1BhdGhLZXk7XG4gICAgaWYgKHNjb3BlID09PSB2b2lkIDApIHsgc2NvcGUgPSB7IGNvdW50ZXI6IDAsIHZpc2l0ZWQ6IG5ldyBNYXAoKSB9OyB9XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgaWYgKCEocGF0aC5sZW5ndGggPiAyICYmIHBhdGgubGVuZ3RoID4gY29uZmlnLm9wdGltaXplZE1pbkxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgIGkgPSAxO1xuICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoIShpIDwgcGF0aC5sZW5ndGggLSAxKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XG4gICAgICAgICAgICAgICAgaWYgKHNjb3BlLmNvdW50ZXIgPiBjb25maWcubWF4TnVtYmVyT2ZUcmllcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107IC8vIE9rYXkgQXQgbGVhc3QgSSB0cmllZCFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuY291bnRlciArPSAxO1xuICAgICAgICAgICAgICAgIG5ld1BhdGggPSBwYXRoLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgbmV3UGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgbmV3UGF0aEtleSA9IHNlbGVjdG9yKG5ld1BhdGgpO1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS52aXNpdGVkLmhhcyhuZXdQYXRoS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHVuaXF1ZShuZXdQYXRoKSAmJiBzYW1lKG5ld1BhdGgsIGlucHV0KSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ld1BhdGhdO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBzY29wZS52aXNpdGVkLnNldChuZXdQYXRoS2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzUgLyp5aWVsZCoqLywgX192YWx1ZXMob3B0aW1pemUobmV3UGF0aCwgaW5wdXQsIHNjb3BlKSldO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHNhbWUocGF0aCwgaW5wdXQpIHtcbiAgICByZXR1cm4gcm9vdERvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IocGF0aCkpID09PSBpbnB1dDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@medv/finder/dist/index.js\n");

/***/ }),

/***/ "./node_modules/@medv/finder/node_modules/cssesc/cssesc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@medv/finder/node_modules/cssesc/cssesc.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*! https://mths.be/cssesc v1.0.1 by @mathias */\n\n\nvar object = {};\nvar hasOwnProperty = object.hasOwnProperty;\nvar merge = function merge(options, defaults) {\n\tif (!options) {\n\t\treturn defaults;\n\t}\n\tvar result = {};\n\tfor (var key in defaults) {\n\t\t// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since\n\t\t// only recognized option names are used.\n\t\tresult[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];\n\t}\n\treturn result;\n};\n\nvar regexAnySingleEscape = /[ -,\\.\\/;-@\\[-\\^`\\{-~]/;\nvar regexSingleEscape = /[ -,\\.\\/;-@\\[\\]\\^`\\{-~]/;\nvar regexAlwaysEscape = /['\"\\\\]/;\nvar regexExcessiveSpaces = /(^|\\\\+)?(\\\\[A-F0-9]{1,6})\\x20(?![a-fA-F0-9\\x20])/g;\n\n// https://mathiasbynens.be/notes/css-escapes#css\nvar cssesc = function cssesc(string, options) {\n\toptions = merge(options, cssesc.options);\n\tif (options.quotes != 'single' && options.quotes != 'double') {\n\t\toptions.quotes = 'single';\n\t}\n\tvar quote = options.quotes == 'double' ? '\"' : '\\'';\n\tvar isIdentifier = options.isIdentifier;\n\n\tvar firstChar = string.charAt(0);\n\tvar output = '';\n\tvar counter = 0;\n\tvar length = string.length;\n\twhile (counter < length) {\n\t\tvar character = string.charAt(counter++);\n\t\tvar codePoint = character.charCodeAt();\n\t\tvar value = void 0;\n\t\t// If it’s not a printable ASCII character…\n\t\tif (codePoint < 0x20 || codePoint > 0x7E) {\n\t\t\tif (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {\n\t\t\t\t// It’s a high surrogate, and there is a next character.\n\t\t\t\tvar extra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) {\n\t\t\t\t\t// next character is low surrogate\n\t\t\t\t\tcodePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;\n\t\t\t\t} else {\n\t\t\t\t\t// It’s an unmatched surrogate; only append this code unit, in case\n\t\t\t\t\t// the next code unit is the high surrogate of a surrogate pair.\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t}\n\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t} else {\n\t\t\tif (options.escapeEverything) {\n\t\t\t\tif (regexAnySingleEscape.test(character)) {\n\t\t\t\t\tvalue = '\\\\' + character;\n\t\t\t\t} else {\n\t\t\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t\t\t}\n\t\t\t\t// Note: `:` could be escaped as `\\:`, but that fails in IE < 8.\n\t\t\t} else if (/[\\t\\n\\f\\r\\x0B:]/.test(character)) {\n\t\t\t\tif (!isIdentifier && character == ':') {\n\t\t\t\t\tvalue = character;\n\t\t\t\t} else {\n\t\t\t\t\tvalue = '\\\\' + codePoint.toString(16).toUpperCase() + ' ';\n\t\t\t\t}\n\t\t\t} else if (character == '\\\\' || !isIdentifier && (character == '\"' && quote == character || character == '\\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {\n\t\t\t\tvalue = '\\\\' + character;\n\t\t\t} else {\n\t\t\t\tvalue = character;\n\t\t\t}\n\t\t}\n\t\toutput += value;\n\t}\n\n\tif (isIdentifier) {\n\t\tif (/^_/.test(output)) {\n\t\t\t// Prevent IE6 from ignoring the rule altogether (in case this is for an\n\t\t\t// identifier used as a selector)\n\t\t\toutput = '\\\\_' + output.slice(1);\n\t\t} else if (/^-[-\\d]/.test(output)) {\n\t\t\toutput = '\\\\-' + output.slice(1);\n\t\t} else if (/\\d/.test(firstChar)) {\n\t\t\toutput = '\\\\3' + firstChar + ' ' + output.slice(1);\n\t\t}\n\t}\n\n\t// Remove spaces after `\\HEX` escapes that are not followed by a hex digit,\n\t// since they’re redundant. Note that this is only possible if the escape\n\t// sequence isn’t preceded by an odd number of backslashes.\n\toutput = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {\n\t\tif ($1 && $1.length % 2) {\n\t\t\t// It’s not safe to remove the space, so don’t.\n\t\t\treturn $0;\n\t\t}\n\t\t// Strip the space.\n\t\treturn ($1 || '') + $2;\n\t});\n\n\tif (!isIdentifier && options.wrap) {\n\t\treturn quote + output + quote;\n\t}\n\treturn output;\n};\n\n// Expose default options (so they can be overridden globally).\ncssesc.options = {\n\t'escapeEverything': false,\n\t'isIdentifier': false,\n\t'quotes': 'single',\n\t'wrap': false\n};\n\ncssesc.version = '1.0.1';\n\nmodule.exports = cssesc;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1lZHYvZmluZGVyL25vZGVfbW9kdWxlcy9jc3Nlc2MvY3NzZXNjLmpzPzZlYTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLElBQUk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsVUFBVTtBQUMvQyxrQ0FBa0MsV0FBVztBQUM3QztBQUNBLGdEQUFnRCxJQUFJOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQG1lZHYvZmluZGVyL25vZGVfbW9kdWxlcy9jc3Nlc2MvY3NzZXNjLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohIGh0dHBzOi8vbXRocy5iZS9jc3Nlc2MgdjEuMC4xIGJ5IEBtYXRoaWFzICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3QgPSB7fTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKG9wdGlvbnMsIGRlZmF1bHRzKSB7XG5cdGlmICghb3B0aW9ucykge1xuXHRcdHJldHVybiBkZWZhdWx0cztcblx0fVxuXHR2YXIgcmVzdWx0ID0ge307XG5cdGZvciAodmFyIGtleSBpbiBkZWZhdWx0cykge1xuXHRcdC8vIGBpZiAoZGVmYXVsdHMuaGFzT3duUHJvcGVydHkoa2V5KSB7IOKApiB9YCBpcyBub3QgbmVlZGVkIGhlcmUsIHNpbmNlXG5cdFx0Ly8gb25seSByZWNvZ25pemVkIG9wdGlvbiBuYW1lcyBhcmUgdXNlZC5cblx0XHRyZXN1bHRba2V5XSA9IGhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywga2V5KSA/IG9wdGlvbnNba2V5XSA6IGRlZmF1bHRzW2tleV07XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciByZWdleEFueVNpbmdsZUVzY2FwZSA9IC9bIC0sXFwuXFwvOy1AXFxbLVxcXmBcXHstfl0vO1xudmFyIHJlZ2V4U2luZ2xlRXNjYXBlID0gL1sgLSxcXC5cXC87LUBcXFtcXF1cXF5gXFx7LX5dLztcbnZhciByZWdleEFsd2F5c0VzY2FwZSA9IC9bJ1wiXFxcXF0vO1xudmFyIHJlZ2V4RXhjZXNzaXZlU3BhY2VzID0gLyhefFxcXFwrKT8oXFxcXFtBLUYwLTldezEsNn0pXFx4MjAoPyFbYS1mQS1GMC05XFx4MjBdKS9nO1xuXG4vLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvY3NzLWVzY2FwZXMjY3NzXG52YXIgY3NzZXNjID0gZnVuY3Rpb24gY3NzZXNjKHN0cmluZywgb3B0aW9ucykge1xuXHRvcHRpb25zID0gbWVyZ2Uob3B0aW9ucywgY3NzZXNjLm9wdGlvbnMpO1xuXHRpZiAob3B0aW9ucy5xdW90ZXMgIT0gJ3NpbmdsZScgJiYgb3B0aW9ucy5xdW90ZXMgIT0gJ2RvdWJsZScpIHtcblx0XHRvcHRpb25zLnF1b3RlcyA9ICdzaW5nbGUnO1xuXHR9XG5cdHZhciBxdW90ZSA9IG9wdGlvbnMucXVvdGVzID09ICdkb3VibGUnID8gJ1wiJyA6ICdcXCcnO1xuXHR2YXIgaXNJZGVudGlmaWVyID0gb3B0aW9ucy5pc0lkZW50aWZpZXI7XG5cblx0dmFyIGZpcnN0Q2hhciA9IHN0cmluZy5jaGFyQXQoMCk7XG5cdHZhciBvdXRwdXQgPSAnJztcblx0dmFyIGNvdW50ZXIgPSAwO1xuXHR2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHR2YXIgY2hhcmFjdGVyID0gc3RyaW5nLmNoYXJBdChjb3VudGVyKyspO1xuXHRcdHZhciBjb2RlUG9pbnQgPSBjaGFyYWN0ZXIuY2hhckNvZGVBdCgpO1xuXHRcdHZhciB2YWx1ZSA9IHZvaWQgMDtcblx0XHQvLyBJZiBpdOKAmXMgbm90IGEgcHJpbnRhYmxlIEFTQ0lJIGNoYXJhY3RlcuKAplxuXHRcdGlmIChjb2RlUG9pbnQgPCAweDIwIHx8IGNvZGVQb2ludCA+IDB4N0UpIHtcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBJdOKAmXMgYSBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXIuXG5cdFx0XHRcdHZhciBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkge1xuXHRcdFx0XHRcdC8vIG5leHQgY2hhcmFjdGVyIGlzIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRjb2RlUG9pbnQgPSAoKGNvZGVQb2ludCAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEl04oCZcyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZVxuXHRcdFx0XHRcdC8vIHRoZSBuZXh0IGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpci5cblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHZhbHVlID0gJ1xcXFwnICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgJyAnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAob3B0aW9ucy5lc2NhcGVFdmVyeXRoaW5nKSB7XG5cdFx0XHRcdGlmIChyZWdleEFueVNpbmdsZUVzY2FwZS50ZXN0KGNoYXJhY3RlcikpIHtcblx0XHRcdFx0XHR2YWx1ZSA9ICdcXFxcJyArIGNoYXJhY3Rlcjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9ICdcXFxcJyArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArICcgJztcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBOb3RlOiBgOmAgY291bGQgYmUgZXNjYXBlZCBhcyBgXFw6YCwgYnV0IHRoYXQgZmFpbHMgaW4gSUUgPCA4LlxuXHRcdFx0fSBlbHNlIGlmICgvW1xcdFxcblxcZlxcclxceDBCOl0vLnRlc3QoY2hhcmFjdGVyKSkge1xuXHRcdFx0XHRpZiAoIWlzSWRlbnRpZmllciAmJiBjaGFyYWN0ZXIgPT0gJzonKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjaGFyYWN0ZXI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSAnXFxcXCcgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyAnICc7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoY2hhcmFjdGVyID09ICdcXFxcJyB8fCAhaXNJZGVudGlmaWVyICYmIChjaGFyYWN0ZXIgPT0gJ1wiJyAmJiBxdW90ZSA9PSBjaGFyYWN0ZXIgfHwgY2hhcmFjdGVyID09ICdcXCcnICYmIHF1b3RlID09IGNoYXJhY3RlcikgfHwgaXNJZGVudGlmaWVyICYmIHJlZ2V4U2luZ2xlRXNjYXBlLnRlc3QoY2hhcmFjdGVyKSkge1xuXHRcdFx0XHR2YWx1ZSA9ICdcXFxcJyArIGNoYXJhY3Rlcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbHVlID0gY2hhcmFjdGVyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRvdXRwdXQgKz0gdmFsdWU7XG5cdH1cblxuXHRpZiAoaXNJZGVudGlmaWVyKSB7XG5cdFx0aWYgKC9eXy8udGVzdChvdXRwdXQpKSB7XG5cdFx0XHQvLyBQcmV2ZW50IElFNiBmcm9tIGlnbm9yaW5nIHRoZSBydWxlIGFsdG9nZXRoZXIgKGluIGNhc2UgdGhpcyBpcyBmb3IgYW5cblx0XHRcdC8vIGlkZW50aWZpZXIgdXNlZCBhcyBhIHNlbGVjdG9yKVxuXHRcdFx0b3V0cHV0ID0gJ1xcXFxfJyArIG91dHB1dC5zbGljZSgxKTtcblx0XHR9IGVsc2UgaWYgKC9eLVstXFxkXS8udGVzdChvdXRwdXQpKSB7XG5cdFx0XHRvdXRwdXQgPSAnXFxcXC0nICsgb3V0cHV0LnNsaWNlKDEpO1xuXHRcdH0gZWxzZSBpZiAoL1xcZC8udGVzdChmaXJzdENoYXIpKSB7XG5cdFx0XHRvdXRwdXQgPSAnXFxcXDMnICsgZmlyc3RDaGFyICsgJyAnICsgb3V0cHV0LnNsaWNlKDEpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJlbW92ZSBzcGFjZXMgYWZ0ZXIgYFxcSEVYYCBlc2NhcGVzIHRoYXQgYXJlIG5vdCBmb2xsb3dlZCBieSBhIGhleCBkaWdpdCxcblx0Ly8gc2luY2UgdGhleeKAmXJlIHJlZHVuZGFudC4gTm90ZSB0aGF0IHRoaXMgaXMgb25seSBwb3NzaWJsZSBpZiB0aGUgZXNjYXBlXG5cdC8vIHNlcXVlbmNlIGlzbuKAmXQgcHJlY2VkZWQgYnkgYW4gb2RkIG51bWJlciBvZiBiYWNrc2xhc2hlcy5cblx0b3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UocmVnZXhFeGNlc3NpdmVTcGFjZXMsIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG5cdFx0aWYgKCQxICYmICQxLmxlbmd0aCAlIDIpIHtcblx0XHRcdC8vIEl04oCZcyBub3Qgc2FmZSB0byByZW1vdmUgdGhlIHNwYWNlLCBzbyBkb27igJl0LlxuXHRcdFx0cmV0dXJuICQwO1xuXHRcdH1cblx0XHQvLyBTdHJpcCB0aGUgc3BhY2UuXG5cdFx0cmV0dXJuICgkMSB8fCAnJykgKyAkMjtcblx0fSk7XG5cblx0aWYgKCFpc0lkZW50aWZpZXIgJiYgb3B0aW9ucy53cmFwKSB7XG5cdFx0cmV0dXJuIHF1b3RlICsgb3V0cHV0ICsgcXVvdGU7XG5cdH1cblx0cmV0dXJuIG91dHB1dDtcbn07XG5cbi8vIEV4cG9zZSBkZWZhdWx0IG9wdGlvbnMgKHNvIHRoZXkgY2FuIGJlIG92ZXJyaWRkZW4gZ2xvYmFsbHkpLlxuY3NzZXNjLm9wdGlvbnMgPSB7XG5cdCdlc2NhcGVFdmVyeXRoaW5nJzogZmFsc2UsXG5cdCdpc0lkZW50aWZpZXInOiBmYWxzZSxcblx0J3F1b3Rlcyc6ICdzaW5nbGUnLFxuXHQnd3JhcCc6IGZhbHNlXG59O1xuXG5jc3Nlc2MudmVyc2lvbiA9ICcxLjAuMSc7XG5cbm1vZHVsZS5leHBvcnRzID0gY3NzZXNjO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@medv/finder/node_modules/cssesc/cssesc.js\n");

/***/ }),

/***/ "./node_modules/delegate/src/closest.js":
/*!**********************************************!*\
  !*** ./node_modules/delegate/src/closest.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var DOCUMENT_NODE_TYPE = 9;\n\n/**\n * A polyfill for Element.matches()\n */\nif (typeof Element !== 'undefined' && !Element.prototype.matches) {\n    var proto = Element.prototype;\n\n    proto.matches = proto.matchesSelector ||\n                    proto.mozMatchesSelector ||\n                    proto.msMatchesSelector ||\n                    proto.oMatchesSelector ||\n                    proto.webkitMatchesSelector;\n}\n\n/**\n * Finds the closest parent that matches a selector.\n *\n * @param {Element} element\n * @param {String} selector\n * @return {Function}\n */\nfunction closest (element, selector) {\n    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {\n        if (typeof element.matches === 'function' &&\n            element.matches(selector)) {\n          return element;\n        }\n        element = element.parentNode;\n    }\n}\n\nmodule.exports = closest;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2Nsb3Nlc3QuanM/OTRkOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9kZWxlZ2F0ZS9zcmMvY2xvc2VzdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBET0NVTUVOVF9OT0RFX1RZUEUgPSA5O1xuXG4vKipcbiAqIEEgcG9seWZpbGwgZm9yIEVsZW1lbnQubWF0Y2hlcygpXG4gKi9cbmlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICB2YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLm1hdGNoZXMgPSBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IHBhcmVudCB0aGF0IG1hdGNoZXMgYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3QgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gRE9DVU1FTlRfTk9ERV9UWVBFKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5tYXRjaGVzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/delegate/src/closest.js\n");

/***/ }),

/***/ "./node_modules/delegate/src/delegate.js":
/*!***********************************************!*\
  !*** ./node_modules/delegate/src/delegate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var closest = __webpack_require__(/*! ./closest */ \"./node_modules/delegate/src/closest.js\");\n\n/**\n * Delegates event to a selector.\n *\n * @param {Element} element\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @param {Boolean} useCapture\n * @return {Object}\n */\nfunction _delegate(element, selector, type, callback, useCapture) {\n    var listenerFn = listener.apply(this, arguments);\n\n    element.addEventListener(type, listenerFn, useCapture);\n\n    return {\n        destroy: function() {\n            element.removeEventListener(type, listenerFn, useCapture);\n        }\n    }\n}\n\n/**\n * Delegates event to a selector.\n *\n * @param {Element|String|Array} [elements]\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @param {Boolean} useCapture\n * @return {Object}\n */\nfunction delegate(elements, selector, type, callback, useCapture) {\n    // Handle the regular Element usage\n    if (typeof elements.addEventListener === 'function') {\n        return _delegate.apply(null, arguments);\n    }\n\n    // Handle Element-less usage, it defaults to global delegation\n    if (typeof type === 'function') {\n        // Use `document` as the first parameter, then apply arguments\n        // This is a short way to .unshift `arguments` without running into deoptimizations\n        return _delegate.bind(null, document).apply(null, arguments);\n    }\n\n    // Handle Selector-based usage\n    if (typeof elements === 'string') {\n        elements = document.querySelectorAll(elements);\n    }\n\n    // Handle Array-like based usage\n    return Array.prototype.map.call(elements, function (element) {\n        return _delegate(element, selector, type, callback, useCapture);\n    });\n}\n\n/**\n * Finds closest match and invokes callback.\n *\n * @param {Element} element\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @return {Function}\n */\nfunction listener(element, selector, type, callback) {\n    return function(e) {\n        e.delegateTarget = closest(e.target, selector);\n\n        if (e.delegateTarget) {\n            callback.call(element, e);\n        }\n    }\n}\n\nmodule.exports = delegate;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2RlbGVnYXRlLmpzPzhjNTAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxtQkFBTyxDQUFDLHlEQUFXOztBQUVqQztBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2RlbGVnYXRlL3NyYy9kZWxlZ2F0ZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjbG9zZXN0ID0gcmVxdWlyZSgnLi9jbG9zZXN0Jyk7XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVXNlIGBkb2N1bWVudGAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgdGhlbiBhcHBseSBhcmd1bWVudHNcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGNsb3Nlc3QoZS50YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWxlZ2F0ZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/delegate/src/delegate.js\n");

/***/ }),

/***/ "./src/code-generator/dom-events-to-record.js":
/*!****************************************************!*\
  !*** ./src/code-generator/dom-events-to-record.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  CLICK: \"click\",\n  DBLCLICK: \"dblclick\",\n  CHANGE: \"change\",\n  KEYDOWN: \"keydown\",\n  SELECT: \"select\",\n  SUBMIT: \"submit\",\n  LOAD: \"load\",\n  UNLOAD: \"unload\",\n  POPSTATE: \"popstate\"\n}); // const events = [\n//    abort,\n//    afterprint,\n//    beforeprint,\n//    beforeunload,\n//    blur,\n//    canplay,\n//    canplaythrough,\n//    change,\n//    click,\n//    contextmenu,\n//    copy,\n//    cuechange,\n//    cut,\n//    dblclick,\n//    DOMContentLoaded,\n//    drag,\n//    dragend,\n//    dragenter,\n//    dragleave,\n//    dragover,\n//    dragstart,\n//    drop,\n//    durationchange,\n//    emptied,\n//    ended,\n//    error,\n//    focus,\n//    focusin,\n//    focusout,\n//    formchange,\n//    forminput,\n//    hashchange,\n//    input,\n//    invalid,\n//    keydown,\n//    keypress,\n//    keyup,\n//    load,\n//    loadeddata,\n//    loadedmetadata,\n//    loadstart,\n//    message,\n//    mousedown,\n//    mouseenter,\n//    mouseleave,\n//    mousemove,\n//    mouseout,\n//    mouseover,\n//    mouseup,\n//    mousewheel,\n//    offline,\n//    online,\n//    pagehide,\n//    pageshow,\n//    paste,\n//    pause,\n//    play,\n//    playing,\n//    popstate,\n//    progress,\n//    ratechange,\n//    readystatechange,\n//    redo,\n//    reset,\n//    resize,\n//    scroll,\n//    seeked,\n//    seeking,\n//    select,\n//    show,\n//    stalled,\n//    storage,\n//    submit,\n//    suspend,\n//    timeupdate,\n//    undo,\n//    unload,\n//    volumechange,\n//    waiting\n// ];\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvZG9tLWV2ZW50cy10by1yZWNvcmQuanM/ODI4ZCJdLCJuYW1lcyI6WyJDTElDSyIsIkRCTENMSUNLIiwiQ0hBTkdFIiwiS0VZRE9XTiIsIlNFTEVDVCIsIlNVQk1JVCIsIkxPQUQiLCJVTkxPQUQiLCJQT1BTVEFURSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZTtBQUNiQSxPQUFLLEVBQUUsT0FETTtBQUViQyxVQUFRLEVBQUUsVUFGRztBQUdiQyxRQUFNLEVBQUUsUUFISztBQUliQyxTQUFPLEVBQUUsU0FKSTtBQUtiQyxRQUFNLEVBQUUsUUFMSztBQU1iQyxRQUFNLEVBQUUsUUFOSztBQU9iQyxNQUFJLEVBQUUsTUFQTztBQVFiQyxRQUFNLEVBQUUsUUFSSztBQVNiQyxVQUFRLEVBQUU7QUFURyxDQUFmLEUsQ0FZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9zcmMvY29kZS1nZW5lcmF0b3IvZG9tLWV2ZW50cy10by1yZWNvcmQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIENMSUNLOiBcImNsaWNrXCIsXG4gIERCTENMSUNLOiBcImRibGNsaWNrXCIsXG4gIENIQU5HRTogXCJjaGFuZ2VcIixcbiAgS0VZRE9XTjogXCJrZXlkb3duXCIsXG4gIFNFTEVDVDogXCJzZWxlY3RcIixcbiAgU1VCTUlUOiBcInN1Ym1pdFwiLFxuICBMT0FEOiBcImxvYWRcIixcbiAgVU5MT0FEOiBcInVubG9hZFwiLFxuICBQT1BTVEFURTogXCJwb3BzdGF0ZVwiLFxufTtcblxuLy8gY29uc3QgZXZlbnRzID0gW1xuLy8gICAgYWJvcnQsXG4vLyAgICBhZnRlcnByaW50LFxuLy8gICAgYmVmb3JlcHJpbnQsXG4vLyAgICBiZWZvcmV1bmxvYWQsXG4vLyAgICBibHVyLFxuLy8gICAgY2FucGxheSxcbi8vICAgIGNhbnBsYXl0aHJvdWdoLFxuLy8gICAgY2hhbmdlLFxuLy8gICAgY2xpY2ssXG4vLyAgICBjb250ZXh0bWVudSxcbi8vICAgIGNvcHksXG4vLyAgICBjdWVjaGFuZ2UsXG4vLyAgICBjdXQsXG4vLyAgICBkYmxjbGljayxcbi8vICAgIERPTUNvbnRlbnRMb2FkZWQsXG4vLyAgICBkcmFnLFxuLy8gICAgZHJhZ2VuZCxcbi8vICAgIGRyYWdlbnRlcixcbi8vICAgIGRyYWdsZWF2ZSxcbi8vICAgIGRyYWdvdmVyLFxuLy8gICAgZHJhZ3N0YXJ0LFxuLy8gICAgZHJvcCxcbi8vICAgIGR1cmF0aW9uY2hhbmdlLFxuLy8gICAgZW1wdGllZCxcbi8vICAgIGVuZGVkLFxuLy8gICAgZXJyb3IsXG4vLyAgICBmb2N1cyxcbi8vICAgIGZvY3VzaW4sXG4vLyAgICBmb2N1c291dCxcbi8vICAgIGZvcm1jaGFuZ2UsXG4vLyAgICBmb3JtaW5wdXQsXG4vLyAgICBoYXNoY2hhbmdlLFxuLy8gICAgaW5wdXQsXG4vLyAgICBpbnZhbGlkLFxuLy8gICAga2V5ZG93bixcbi8vICAgIGtleXByZXNzLFxuLy8gICAga2V5dXAsXG4vLyAgICBsb2FkLFxuLy8gICAgbG9hZGVkZGF0YSxcbi8vICAgIGxvYWRlZG1ldGFkYXRhLFxuLy8gICAgbG9hZHN0YXJ0LFxuLy8gICAgbWVzc2FnZSxcbi8vICAgIG1vdXNlZG93bixcbi8vICAgIG1vdXNlZW50ZXIsXG4vLyAgICBtb3VzZWxlYXZlLFxuLy8gICAgbW91c2Vtb3ZlLFxuLy8gICAgbW91c2VvdXQsXG4vLyAgICBtb3VzZW92ZXIsXG4vLyAgICBtb3VzZXVwLFxuLy8gICAgbW91c2V3aGVlbCxcbi8vICAgIG9mZmxpbmUsXG4vLyAgICBvbmxpbmUsXG4vLyAgICBwYWdlaGlkZSxcbi8vICAgIHBhZ2VzaG93LFxuLy8gICAgcGFzdGUsXG4vLyAgICBwYXVzZSxcbi8vICAgIHBsYXksXG4vLyAgICBwbGF5aW5nLFxuLy8gICAgcG9wc3RhdGUsXG4vLyAgICBwcm9ncmVzcyxcbi8vICAgIHJhdGVjaGFuZ2UsXG4vLyAgICByZWFkeXN0YXRlY2hhbmdlLFxuLy8gICAgcmVkbyxcbi8vICAgIHJlc2V0LFxuLy8gICAgcmVzaXplLFxuLy8gICAgc2Nyb2xsLFxuLy8gICAgc2Vla2VkLFxuLy8gICAgc2Vla2luZyxcbi8vICAgIHNlbGVjdCxcbi8vICAgIHNob3csXG4vLyAgICBzdGFsbGVkLFxuLy8gICAgc3RvcmFnZSxcbi8vICAgIHN1Ym1pdCxcbi8vICAgIHN1c3BlbmQsXG4vLyAgICB0aW1ldXBkYXRlLFxuLy8gICAgdW5kbyxcbi8vICAgIHVubG9hZCxcbi8vICAgIHZvbHVtZWNoYW5nZSxcbi8vICAgIHdhaXRpbmdcbi8vIF07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/code-generator/dom-events-to-record.js\n");

/***/ }),

/***/ "./src/code-generator/elements-to-bind-to.ts":
/*!***************************************************!*\
  !*** ./src/code-generator/elements-to-bind-to.ts ***!
  \***************************************************/
/*! exports provided: defaultBindTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultBindTags\", function() { return defaultBindTags; });\nconst defaultBindTags = [\n    \"input\",\n    \"textarea\",\n    \"a\",\n    \"button\",\n    \"select\",\n    \"option\",\n    \"label\",\n    \"h1\",\n    \"h2\",\n    \"h3\",\n    \"h4\",\n    \"h5\",\n    \"h6\",\n    \"div\",\n    \"span\",\n    \"img\",\n    ///\n    // \"aui-nav-menu\",\n    // \"button\",\n];\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvZWxlbWVudHMtdG8tYmluZC10by50cz8zZmI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi9zcmMvY29kZS1nZW5lcmF0b3IvZWxlbWVudHMtdG8tYmluZC10by50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZWZhdWx0QmluZFRhZ3MgPSBbXG4gICAgXCJpbnB1dFwiLFxuICAgIFwidGV4dGFyZWFcIixcbiAgICBcImFcIixcbiAgICBcImJ1dHRvblwiLFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJvcHRpb25cIixcbiAgICBcImxhYmVsXCIsXG4gICAgXCJoMVwiLFxuICAgIFwiaDJcIixcbiAgICBcImgzXCIsXG4gICAgXCJoNFwiLFxuICAgIFwiaDVcIixcbiAgICBcImg2XCIsXG4gICAgXCJkaXZcIixcbiAgICBcInNwYW5cIixcbiAgICBcImltZ1wiLFxuICAgIC8vL1xuICAgIC8vIFwiYXVpLW5hdi1tZW51XCIsXG4gICAgLy8gXCJidXR0b25cIixcbl07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/code-generator/elements-to-bind-to.ts\n");

/***/ }),

/***/ "./src/code-generator/pptr-actions.js":
/*!********************************************!*\
  !*** ./src/code-generator/pptr-actions.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  GOTO: \"goto*\",\n  VIEWPORT: \"viewport*\",\n  WAITFORSELECTOR: \"waitForSelector*\",\n  NAVIGATION: \"navigation*\",\n  NAVIGATE: \"navigate*\",\n  NAVIGATION_PROMISE: \"navigation-promise*\",\n  FRAME_SET: \"frame-set*\",\n  REQUEST: \"request*\"\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zLmpzP2Y3NTUiXSwibmFtZXMiOlsiR09UTyIsIlZJRVdQT1JUIiwiV0FJVEZPUlNFTEVDVE9SIiwiTkFWSUdBVElPTiIsIk5BVklHQVRFIiwiTkFWSUdBVElPTl9QUk9NSVNFIiwiRlJBTUVfU0VUIiwiUkVRVUVTVCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZTtBQUNiQSxNQUFJLEVBQUUsT0FETztBQUViQyxVQUFRLEVBQUUsV0FGRztBQUdiQyxpQkFBZSxFQUFFLGtCQUhKO0FBSWJDLFlBQVUsRUFBRSxhQUpDO0FBS2JDLFVBQVEsRUFBRSxXQUxHO0FBTWJDLG9CQUFrQixFQUFFLHFCQU5QO0FBT2JDLFdBQVMsRUFBRSxZQVBFO0FBUWJDLFNBQU8sRUFBRTtBQVJJLENBQWYiLCJmaWxlIjoiLi9zcmMvY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBHT1RPOiBcImdvdG8qXCIsXG4gIFZJRVdQT1JUOiBcInZpZXdwb3J0KlwiLFxuICBXQUlURk9SU0VMRUNUT1I6IFwid2FpdEZvclNlbGVjdG9yKlwiLFxuICBOQVZJR0FUSU9OOiBcIm5hdmlnYXRpb24qXCIsXG4gIE5BVklHQVRFOiBcIm5hdmlnYXRlKlwiLFxuICBOQVZJR0FUSU9OX1BST01JU0U6IFwibmF2aWdhdGlvbi1wcm9taXNlKlwiLFxuICBGUkFNRV9TRVQ6IFwiZnJhbWUtc2V0KlwiLFxuICBSRVFVRVNUOiBcInJlcXVlc3QqXCIsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/code-generator/pptr-actions.js\n");

/***/ }),

/***/ "./src/content-scripts/index.js":
/*!**************************************!*\
  !*** ./src/content-scripts/index.js ***!
  \**************************************/
/*! exports provided: matchClassNames, needAddPreCLElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchClassNames\", function() { return matchClassNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"needAddPreCLElements\", function() { return needAddPreCLElements; });\n/* harmony import */ var _code_generator_dom_events_to_record__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../code-generator/dom-events-to-record */ \"./src/code-generator/dom-events-to-record.js\");\n/* harmony import */ var _code_generator_elements_to_bind_to__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../code-generator/elements-to-bind-to */ \"./src/code-generator/elements-to-bind-to.ts\");\n/* harmony import */ var _medv_finder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @medv/finder */ \"./node_modules/@medv/finder/dist/index.js\");\n/* harmony import */ var _medv_finder__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_medv_finder__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../code-generator/pptr-actions */ \"./src/code-generator/pptr-actions.js\");\n/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! delegate */ \"./node_modules/delegate/src/delegate.js\");\n/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(delegate__WEBPACK_IMPORTED_MODULE_4__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n // import { finder } from \"../code-generator/alauda-finder\";\n\n\n\n // note: 需要尽量避免aui-input的匹配\n\nvar matchClassNames = [\"aui-search\", \"aui-button\", \"aui-select\", \"aui-accordion\", \"aui-breadcrumb\", \"aui-nav\", \"aui-form\", \"aui-icon\", \"aui-tab\", \"aui-tooltip\", \"aui-option\", \"acl-disabled-container\", \"acl-\", \"rc-\"]; // need add pre command lines elements\n\nvar needAddPreCLElements = [];\n\nvar EventRecorder = /*#__PURE__*/function () {\n  function EventRecorder() {\n    _classCallCheck(this, EventRecorder);\n\n    this.eventLog = [];\n    this.previousEvent = null;\n    this.previousRouter = null;\n  }\n\n  _createClass(EventRecorder, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      chrome.storage.local.get([\"options\"], function (_ref) {\n        var options = _ref.options;\n\n        var _ref2 = options ? options.code : {},\n            dataAttribute = _ref2.dataAttribute;\n\n        var startContext = _this;\n\n        if (dataAttribute) {\n          _this.dataAttribute = dataAttribute;\n        } // yintest 监听 pushstate\n        // const _historyWrap = function(type) {\n        //   const orig = window.history[type];\n        //   const e = new Event(type);\n        //   return function() {\n        //     const rv = orig.apply(this, arguments);\n        //     e.arguments = arguments;\n        //     window.dispatchEvent(e);\n        //     return rv;\n        //   };\n        // };\n        // window.history.pushState = _historyWrap(\"pushState\");\n        // window.history.replaceState = _historyWrap(\"replaceState\");\n        // window.addEventListener(\"pushState\", function(e) {\n        //   console.log(\"change pushState\", e);\n        // });\n        // window.addEventListener(\"replaceState\", function(e) {\n        //   console.log(\"change replaceState\", e);\n        // });\n\n\n        var events = Object.values(_code_generator_dom_events_to_record__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n        if (!window.pptRecorderAddedControlListeners) {\n          _this.addAllListeners(_code_generator_elements_to_bind_to__WEBPACK_IMPORTED_MODULE_1__[\"defaultBindTags\"], events);\n\n          window.pptRecorderAddedControlListeners = true;\n        }\n\n        if (!window.document.pptRecorderAddedControlListeners && chrome.runtime && chrome.runtime.onMessage) {\n          var boundedGetCurrentUrl = _this.getCurrentUrl.bind(_this);\n\n          var boundedGetViewPortSize = _this.getViewPortSize.bind(_this);\n\n          chrome.runtime.onMessage.addListener(boundedGetCurrentUrl);\n          chrome.runtime.onMessage.addListener(boundedGetViewPortSize);\n          window.document.pptRecorderAddedControlListeners = true;\n        }\n\n        chrome.storage.local.get(\"firstRun\", function (items) {\n          if (!items.hasOwnProperty(\"firstRun\")) {\n            chrome.storage.local.set({\n              firstRun: 0\n            });\n            items.firstRun = 0;\n          }\n\n          if (items.hasOwnProperty(\"firstRun\") && !items.firstRun) {\n            startContext.sendMessage({\n              control: \"get-viewport-size\",\n              coordinates: {\n                width: window.innerWidth,\n                height: window.innerHeight\n              }\n            });\n            startContext.sendMessage({\n              control: \"get-current-url\",\n              origin: window.location.origin,\n              href: window.location.href\n            });\n            chrome.storage.local.set({\n              firstRun: 1\n            });\n          }\n        });\n\n        _this.sendMessage({\n          control: \"event-recorder-started\"\n        });\n\n        console.debug(\"Cypress Recorder in-page EventRecorder started\"); // 绑定angular event router end\n\n        if (window._cy_navigate) {\n          console.log(\"_cy_navigate\", window._cy_navigate);\n        }\n      });\n    }\n  }, {\n    key: \"addAllListeners\",\n    value: function addAllListeners(elements, events) {\n      var boundedRecordEvent = this.recordEvent.bind(this);\n      events.forEach(function (type) {\n        window.addEventListener(type, boundedRecordEvent, true);\n      });\n    }\n  }, {\n    key: \"sendMessage\",\n    value: function sendMessage(msg) {\n      console.debug(\"sending message\", msg);\n\n      try {\n        // poor man's way of detecting whether this script was injected by an actual extension, or is loaded for\n        // testing purposes\n        if (chrome.runtime && chrome.runtime.onMessage) {\n          chrome.runtime.sendMessage(msg);\n        } else {\n          this.eventLog.push(msg);\n        }\n      } catch (err) {\n        console.debug(\"caught error\", err);\n      }\n    }\n  }, {\n    key: \"getCurrentUrl\",\n    value: function getCurrentUrl(msg) {\n      if (msg.control && msg.control === \"get-current-url\") {\n        console.debug(\"sending current url:\", window.location.href);\n        this.sendMessage({\n          control: msg.control,\n          origin: window.location.origin,\n          href: window.location.href\n        });\n      }\n    }\n  }, {\n    key: \"getViewPortSize\",\n    value: function getViewPortSize(msg) {\n      if (msg.control && msg.control === \"get-viewport-size\") {\n        console.debug(\"sending current viewport size\");\n        this.sendMessage({\n          control: msg.control,\n          coordinates: {\n            width: window.innerWidth,\n            height: window.innerHeight\n          }\n        });\n      }\n    }\n  }, {\n    key: \"recordEvent\",\n    value: function recordEvent(e) {\n      if (this.previousEvent && this.previousEvent.timeStamp === e.timeStamp) return;\n      this.previousEvent = e; // yintest 判断url是否发生了改变\n\n      if (window.location.href !== this.previousRouter) {\n        this.previousRouter = window.location.href;\n        this.sendMessage({\n          action: _code_generator_pptr_actions__WEBPACK_IMPORTED_MODULE_3__[\"default\"].NAVIGATE,\n          href: this.previousRouter\n        });\n      }\n\n      var baseOptions = {\n        className: function className(name) {\n          return matchClassNames.some(function (item) {\n            return name.includes(item);\n          });\n        },\n        tagName: function tagName(name) {\n          return matchClassNames.some(function (item) {\n            return name.includes(item);\n          });\n        },\n        attr: function attr(name, value) {\n          return name.includes(\"data-cy\");\n        },\n        idName: function idName(name) {\n          return !name.includes(\"cdk-\");\n        }\n      };\n      var selector = e.target.hasAttribute && e.target.hasAttribute(this.dataAttribute) ? formatDataSelector(e.target, this.dataAttribute) : _medv_finder__WEBPACK_IMPORTED_MODULE_2___default()(e.target, _objectSpread(_objectSpread({}, baseOptions), {}, {\n        seedMinLength: 1,\n        optimizedMinLength: 2\n      }));\n      var msg = {\n        selector: selector,\n        fullSelector: _medv_finder__WEBPACK_IMPORTED_MODULE_2___default()(e.target, _objectSpread(_objectSpread({}, baseOptions), {}, {\n          seedMinLength: 10,\n          optimizedMinLength: 10\n        })),\n        value: e.target.value,\n        tagName: e.target.tagName,\n        targetType: e.target.type,\n        action: e.type,\n        keyCode: e.keyCode ? e.keyCode : null,\n        href: e.target.href ? e.target.href : null,\n        coordinates: getCoordinates(e),\n        targetObject: e.target,\n        targetText: e.target.innerText\n      };\n      this.sendMessage(msg);\n    }\n  }, {\n    key: \"getEventLog\",\n    value: function getEventLog() {\n      return this.eventLog;\n    }\n  }, {\n    key: \"clearEventLog\",\n    value: function clearEventLog() {\n      this.eventLog = [];\n    }\n  }]);\n\n  return EventRecorder;\n}();\n\nfunction getCoordinates(evt) {\n  var eventsWithCoordinates = {\n    mouseup: true,\n    mousedown: true,\n    mousemove: true,\n    mouseover: true\n  };\n  return eventsWithCoordinates[evt.type] ? {\n    x: evt.clientX,\n    y: evt.clientY\n  } : null;\n}\n\nfunction formatDataSelector(element, attribute) {\n  return \"[\".concat(attribute, \"=\").concat(element.getAttribute(attribute), \"]\");\n}\n\nwindow.eventRecorder = new EventRecorder();\nwindow.eventRecorder.start();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2luZGV4LmpzPzllNmUiXSwibmFtZXMiOlsibWF0Y2hDbGFzc05hbWVzIiwibmVlZEFkZFByZUNMRWxlbWVudHMiLCJFdmVudFJlY29yZGVyIiwiZXZlbnRMb2ciLCJwcmV2aW91c0V2ZW50IiwicHJldmlvdXNSb3V0ZXIiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJnZXQiLCJvcHRpb25zIiwiY29kZSIsImRhdGFBdHRyaWJ1dGUiLCJzdGFydENvbnRleHQiLCJldmVudHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJldmVudHNUb1JlY29yZCIsIndpbmRvdyIsInBwdFJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzIiwiYWRkQWxsTGlzdGVuZXJzIiwiZGVmYXVsdEJpbmRUYWdzIiwiZG9jdW1lbnQiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYm91bmRlZEdldEN1cnJlbnRVcmwiLCJnZXRDdXJyZW50VXJsIiwiYmluZCIsImJvdW5kZWRHZXRWaWV3UG9ydFNpemUiLCJnZXRWaWV3UG9ydFNpemUiLCJhZGRMaXN0ZW5lciIsIml0ZW1zIiwiaGFzT3duUHJvcGVydHkiLCJzZXQiLCJmaXJzdFJ1biIsInNlbmRNZXNzYWdlIiwiY29udHJvbCIsImNvb3JkaW5hdGVzIiwid2lkdGgiLCJpbm5lcldpZHRoIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJvcmlnaW4iLCJsb2NhdGlvbiIsImhyZWYiLCJjb25zb2xlIiwiZGVidWciLCJfY3lfbmF2aWdhdGUiLCJsb2ciLCJlbGVtZW50cyIsImJvdW5kZWRSZWNvcmRFdmVudCIsInJlY29yZEV2ZW50IiwiZm9yRWFjaCIsInR5cGUiLCJhZGRFdmVudExpc3RlbmVyIiwibXNnIiwicHVzaCIsImVyciIsImUiLCJ0aW1lU3RhbXAiLCJhY3Rpb24iLCJwcHRyQWN0aW9ucyIsIk5BVklHQVRFIiwiYmFzZU9wdGlvbnMiLCJjbGFzc05hbWUiLCJuYW1lIiwic29tZSIsIml0ZW0iLCJpbmNsdWRlcyIsInRhZ05hbWUiLCJhdHRyIiwidmFsdWUiLCJpZE5hbWUiLCJzZWxlY3RvciIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsImZvcm1hdERhdGFTZWxlY3RvciIsImZpbmRlciIsInNlZWRNaW5MZW5ndGgiLCJvcHRpbWl6ZWRNaW5MZW5ndGgiLCJmdWxsU2VsZWN0b3IiLCJ0YXJnZXRUeXBlIiwia2V5Q29kZSIsImdldENvb3JkaW5hdGVzIiwidGFyZ2V0T2JqZWN0IiwidGFyZ2V0VGV4dCIsImlubmVyVGV4dCIsImV2dCIsImV2ZW50c1dpdGhDb29yZGluYXRlcyIsIm1vdXNldXAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJtb3VzZW92ZXIiLCJ4IiwiY2xpZW50WCIsInkiLCJjbGllbnRZIiwiZWxlbWVudCIsImF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsImV2ZW50UmVjb3JkZXIiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0NBRUE7O0FBQ0E7QUFDQTtDQUlBOztBQUNPLElBQU1BLGVBQWUsR0FBRyxDQUM3QixZQUQ2QixFQUU3QixZQUY2QixFQUc3QixZQUg2QixFQUk3QixlQUo2QixFQUs3QixnQkFMNkIsRUFNN0IsU0FONkIsRUFPN0IsVUFQNkIsRUFRN0IsVUFSNkIsRUFTN0IsU0FUNkIsRUFVN0IsYUFWNkIsRUFXN0IsWUFYNkIsRUFZN0Isd0JBWjZCLEVBYTdCLE1BYjZCLEVBYzdCLEtBZDZCLENBQXhCLEMsQ0FpQlA7O0FBQ08sSUFBTUMsb0JBQW9CLEdBQUcsRUFBN0I7O0lBS0RDLGE7QUFDSiwyQkFBYztBQUFBOztBQUNaLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNEOzs7O1dBRUQsaUJBQVE7QUFBQTs7QUFDTkMsWUFBTSxDQUFDQyxPQUFQLENBQWVDLEtBQWYsQ0FBcUJDLEdBQXJCLENBQXlCLENBQUMsU0FBRCxDQUF6QixFQUFzQyxnQkFBaUI7QUFBQSxZQUFkQyxPQUFjLFFBQWRBLE9BQWM7O0FBQ3JELG9CQUEwQkEsT0FBTyxHQUFHQSxPQUFPLENBQUNDLElBQVgsR0FBa0IsRUFBbkQ7QUFBQSxZQUFRQyxhQUFSLFNBQVFBLGFBQVI7O0FBQ0EsWUFBTUMsWUFBWSxHQUFHLEtBQXJCOztBQUNBLFlBQUlELGFBQUosRUFBbUI7QUFDakIsZUFBSSxDQUFDQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNELFNBTG9ELENBT3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxZQUFNRSxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyw0RUFBZCxDQUFmOztBQUNBLFlBQUksQ0FBQ0MsTUFBTSxDQUFDQyxnQ0FBWixFQUE4QztBQUM1QyxlQUFJLENBQUNDLGVBQUwsQ0FBcUJDLG1GQUFyQixFQUFzQ1AsTUFBdEM7O0FBQ0FJLGdCQUFNLENBQUNDLGdDQUFQLEdBQTBDLElBQTFDO0FBQ0Q7O0FBRUQsWUFDRSxDQUFDRCxNQUFNLENBQUNJLFFBQVAsQ0FBZ0JILGdDQUFqQixJQUNBYixNQUFNLENBQUNpQixPQURQLElBRUFqQixNQUFNLENBQUNpQixPQUFQLENBQWVDLFNBSGpCLEVBSUU7QUFDQSxjQUFNQyxvQkFBb0IsR0FBRyxLQUFJLENBQUNDLGFBQUwsQ0FBbUJDLElBQW5CLENBQXdCLEtBQXhCLENBQTdCOztBQUNBLGNBQU1DLHNCQUFzQixHQUFHLEtBQUksQ0FBQ0MsZUFBTCxDQUFxQkYsSUFBckIsQ0FBMEIsS0FBMUIsQ0FBL0I7O0FBQ0FyQixnQkFBTSxDQUFDaUIsT0FBUCxDQUFlQyxTQUFmLENBQXlCTSxXQUF6QixDQUFxQ0wsb0JBQXJDO0FBQ0FuQixnQkFBTSxDQUFDaUIsT0FBUCxDQUFlQyxTQUFmLENBQXlCTSxXQUF6QixDQUFxQ0Ysc0JBQXJDO0FBQ0FWLGdCQUFNLENBQUNJLFFBQVAsQ0FBZ0JILGdDQUFoQixHQUFtRCxJQUFuRDtBQUNEOztBQUVEYixjQUFNLENBQUNDLE9BQVAsQ0FBZUMsS0FBZixDQUFxQkMsR0FBckIsQ0FBeUIsVUFBekIsRUFBcUMsVUFBU3NCLEtBQVQsRUFBZ0I7QUFDbkQsY0FBSSxDQUFDQSxLQUFLLENBQUNDLGNBQU4sQ0FBcUIsVUFBckIsQ0FBTCxFQUF1QztBQUNyQzFCLGtCQUFNLENBQUNDLE9BQVAsQ0FBZUMsS0FBZixDQUFxQnlCLEdBQXJCLENBQXlCO0FBQUVDLHNCQUFRLEVBQUU7QUFBWixhQUF6QjtBQUNBSCxpQkFBSyxDQUFDRyxRQUFOLEdBQWlCLENBQWpCO0FBQ0Q7O0FBRUQsY0FBSUgsS0FBSyxDQUFDQyxjQUFOLENBQXFCLFVBQXJCLEtBQW9DLENBQUNELEtBQUssQ0FBQ0csUUFBL0MsRUFBeUQ7QUFDdkRyQix3QkFBWSxDQUFDc0IsV0FBYixDQUF5QjtBQUN2QkMscUJBQU8sRUFBRSxtQkFEYztBQUV2QkMseUJBQVcsRUFBRTtBQUNYQyxxQkFBSyxFQUFFcEIsTUFBTSxDQUFDcUIsVUFESDtBQUVYQyxzQkFBTSxFQUFFdEIsTUFBTSxDQUFDdUI7QUFGSjtBQUZVLGFBQXpCO0FBT0E1Qix3QkFBWSxDQUFDc0IsV0FBYixDQUF5QjtBQUN2QkMscUJBQU8sRUFBRSxpQkFEYztBQUV2Qk0sb0JBQU0sRUFBRXhCLE1BQU0sQ0FBQ3lCLFFBQVAsQ0FBZ0JELE1BRkQ7QUFHdkJFLGtCQUFJLEVBQUUxQixNQUFNLENBQUN5QixRQUFQLENBQWdCQztBQUhDLGFBQXpCO0FBS0F0QyxrQkFBTSxDQUFDQyxPQUFQLENBQWVDLEtBQWYsQ0FBcUJ5QixHQUFyQixDQUF5QjtBQUFFQyxzQkFBUSxFQUFFO0FBQVosYUFBekI7QUFDRDtBQUNGLFNBckJEOztBQXVCQSxhQUFJLENBQUNDLFdBQUwsQ0FBaUI7QUFBRUMsaUJBQU8sRUFBRTtBQUFYLFNBQWpCOztBQUNBUyxlQUFPLENBQUNDLEtBQVIsQ0FBYyxnREFBZCxFQXRFcUQsQ0F3RXJEOztBQUNBLFlBQUk1QixNQUFNLENBQUM2QixZQUFYLEVBQXlCO0FBQ3ZCRixpQkFBTyxDQUFDRyxHQUFSLENBQVksY0FBWixFQUE0QjlCLE1BQU0sQ0FBQzZCLFlBQW5DO0FBQ0Q7QUFDRixPQTVFRDtBQTZFRDs7O1dBRUQseUJBQWdCRSxRQUFoQixFQUEwQm5DLE1BQTFCLEVBQWtDO0FBQ2hDLFVBQU1vQyxrQkFBa0IsR0FBRyxLQUFLQyxXQUFMLENBQWlCeEIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBM0I7QUFDQWIsWUFBTSxDQUFDc0MsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBVTtBQUN2Qm5DLGNBQU0sQ0FBQ29DLGdCQUFQLENBQXdCRCxJQUF4QixFQUE4Qkgsa0JBQTlCLEVBQWtELElBQWxEO0FBQ0QsT0FGRDtBQUdEOzs7V0FFRCxxQkFBWUssR0FBWixFQUFpQjtBQUNmVixhQUFPLENBQUNDLEtBQVIsQ0FBYyxpQkFBZCxFQUFpQ1MsR0FBakM7O0FBQ0EsVUFBSTtBQUNGO0FBQ0E7QUFDQSxZQUFJakQsTUFBTSxDQUFDaUIsT0FBUCxJQUFrQmpCLE1BQU0sQ0FBQ2lCLE9BQVAsQ0FBZUMsU0FBckMsRUFBZ0Q7QUFDOUNsQixnQkFBTSxDQUFDaUIsT0FBUCxDQUFlWSxXQUFmLENBQTJCb0IsR0FBM0I7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLcEQsUUFBTCxDQUFjcUQsSUFBZCxDQUFtQkQsR0FBbkI7QUFDRDtBQUNGLE9BUkQsQ0FRRSxPQUFPRSxHQUFQLEVBQVk7QUFDWlosZUFBTyxDQUFDQyxLQUFSLENBQWMsY0FBZCxFQUE4QlcsR0FBOUI7QUFDRDtBQUNGOzs7V0FFRCx1QkFBY0YsR0FBZCxFQUFtQjtBQUNqQixVQUFJQSxHQUFHLENBQUNuQixPQUFKLElBQWVtQixHQUFHLENBQUNuQixPQUFKLEtBQWdCLGlCQUFuQyxFQUFzRDtBQUNwRFMsZUFBTyxDQUFDQyxLQUFSLENBQWMsc0JBQWQsRUFBc0M1QixNQUFNLENBQUN5QixRQUFQLENBQWdCQyxJQUF0RDtBQUNBLGFBQUtULFdBQUwsQ0FBaUI7QUFDZkMsaUJBQU8sRUFBRW1CLEdBQUcsQ0FBQ25CLE9BREU7QUFFZk0sZ0JBQU0sRUFBRXhCLE1BQU0sQ0FBQ3lCLFFBQVAsQ0FBZ0JELE1BRlQ7QUFHZkUsY0FBSSxFQUFFMUIsTUFBTSxDQUFDeUIsUUFBUCxDQUFnQkM7QUFIUCxTQUFqQjtBQUtEO0FBQ0Y7OztXQUVELHlCQUFnQlcsR0FBaEIsRUFBcUI7QUFDbkIsVUFBSUEsR0FBRyxDQUFDbkIsT0FBSixJQUFlbUIsR0FBRyxDQUFDbkIsT0FBSixLQUFnQixtQkFBbkMsRUFBd0Q7QUFDdERTLGVBQU8sQ0FBQ0MsS0FBUixDQUFjLCtCQUFkO0FBQ0EsYUFBS1gsV0FBTCxDQUFpQjtBQUNmQyxpQkFBTyxFQUFFbUIsR0FBRyxDQUFDbkIsT0FERTtBQUVmQyxxQkFBVyxFQUFFO0FBQUVDLGlCQUFLLEVBQUVwQixNQUFNLENBQUNxQixVQUFoQjtBQUE0QkMsa0JBQU0sRUFBRXRCLE1BQU0sQ0FBQ3VCO0FBQTNDO0FBRkUsU0FBakI7QUFJRDtBQUNGOzs7V0FFRCxxQkFBWWlCLENBQVosRUFBZTtBQUNiLFVBQUksS0FBS3RELGFBQUwsSUFBc0IsS0FBS0EsYUFBTCxDQUFtQnVELFNBQW5CLEtBQWlDRCxDQUFDLENBQUNDLFNBQTdELEVBQ0U7QUFDRixXQUFLdkQsYUFBTCxHQUFxQnNELENBQXJCLENBSGEsQ0FJYjs7QUFDQSxVQUFJeEMsTUFBTSxDQUFDeUIsUUFBUCxDQUFnQkMsSUFBaEIsS0FBeUIsS0FBS3ZDLGNBQWxDLEVBQWtEO0FBQ2hELGFBQUtBLGNBQUwsR0FBc0JhLE1BQU0sQ0FBQ3lCLFFBQVAsQ0FBZ0JDLElBQXRDO0FBRUEsYUFBS1QsV0FBTCxDQUFpQjtBQUNmeUIsZ0JBQU0sRUFBRUMsb0VBQVcsQ0FBQ0MsUUFETDtBQUVmbEIsY0FBSSxFQUFFLEtBQUt2QztBQUZJLFNBQWpCO0FBSUQ7O0FBRUQsVUFBTTBELFdBQVcsR0FBRztBQUNsQkMsaUJBQVMsRUFBRSxtQkFBQ0MsSUFBRDtBQUFBLGlCQUFVakUsZUFBZSxDQUFDa0UsSUFBaEIsQ0FBcUIsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVRixJQUFJLENBQUNHLFFBQUwsQ0FBY0QsSUFBZCxDQUFWO0FBQUEsV0FBckIsQ0FBVjtBQUFBLFNBRE87QUFFbEJFLGVBQU8sRUFBRSxpQkFBQ0osSUFBRDtBQUFBLGlCQUFVakUsZUFBZSxDQUFDa0UsSUFBaEIsQ0FBcUIsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVRixJQUFJLENBQUNHLFFBQUwsQ0FBY0QsSUFBZCxDQUFWO0FBQUEsV0FBckIsQ0FBVjtBQUFBLFNBRlM7QUFHbEJHLFlBQUksRUFBRSxjQUFDTCxJQUFELEVBQU9NLEtBQVA7QUFBQSxpQkFBaUJOLElBQUksQ0FBQ0csUUFBTCxDQUFjLFNBQWQsQ0FBakI7QUFBQSxTQUhZO0FBSWxCSSxjQUFNLEVBQUUsZ0JBQUNQLElBQUQ7QUFBQSxpQkFBVSxDQUFDQSxJQUFJLENBQUNHLFFBQUwsQ0FBYyxNQUFkLENBQVg7QUFBQTtBQUpVLE9BQXBCO0FBT0EsVUFBTUssUUFBUSxHQUNaZixDQUFDLENBQUNnQixNQUFGLENBQVNDLFlBQVQsSUFBeUJqQixDQUFDLENBQUNnQixNQUFGLENBQVNDLFlBQVQsQ0FBc0IsS0FBSy9ELGFBQTNCLENBQXpCLEdBQ0lnRSxrQkFBa0IsQ0FBQ2xCLENBQUMsQ0FBQ2dCLE1BQUgsRUFBVyxLQUFLOUQsYUFBaEIsQ0FEdEIsR0FFSWlFLG1EQUFNLENBQUNuQixDQUFDLENBQUNnQixNQUFILGtDQUNEWCxXQURDO0FBRUplLHFCQUFhLEVBQUUsQ0FGWDtBQUdKQywwQkFBa0IsRUFBRTtBQUhoQixTQUhaO0FBU0EsVUFBTXhCLEdBQUcsR0FBRztBQUNWa0IsZ0JBQVEsRUFBRUEsUUFEQTtBQUVWTyxvQkFBWSxFQUFFSCxtREFBTSxDQUFDbkIsQ0FBQyxDQUFDZ0IsTUFBSCxrQ0FDZlgsV0FEZTtBQUVsQmUsdUJBQWEsRUFBRSxFQUZHO0FBR2xCQyw0QkFBa0IsRUFBRTtBQUhGLFdBRlY7QUFPVlIsYUFBSyxFQUFFYixDQUFDLENBQUNnQixNQUFGLENBQVNILEtBUE47QUFRVkYsZUFBTyxFQUFFWCxDQUFDLENBQUNnQixNQUFGLENBQVNMLE9BUlI7QUFTVlksa0JBQVUsRUFBRXZCLENBQUMsQ0FBQ2dCLE1BQUYsQ0FBU3JCLElBVFg7QUFVVk8sY0FBTSxFQUFFRixDQUFDLENBQUNMLElBVkE7QUFXVjZCLGVBQU8sRUFBRXhCLENBQUMsQ0FBQ3dCLE9BQUYsR0FBWXhCLENBQUMsQ0FBQ3dCLE9BQWQsR0FBd0IsSUFYdkI7QUFZVnRDLFlBQUksRUFBRWMsQ0FBQyxDQUFDZ0IsTUFBRixDQUFTOUIsSUFBVCxHQUFnQmMsQ0FBQyxDQUFDZ0IsTUFBRixDQUFTOUIsSUFBekIsR0FBZ0MsSUFaNUI7QUFhVlAsbUJBQVcsRUFBRThDLGNBQWMsQ0FBQ3pCLENBQUQsQ0FiakI7QUFjVjBCLG9CQUFZLEVBQUUxQixDQUFDLENBQUNnQixNQWROO0FBZVZXLGtCQUFVLEVBQUUzQixDQUFDLENBQUNnQixNQUFGLENBQVNZO0FBZlgsT0FBWjtBQWtCQSxXQUFLbkQsV0FBTCxDQUFpQm9CLEdBQWpCO0FBQ0Q7OztXQUVELHVCQUFjO0FBQ1osYUFBTyxLQUFLcEQsUUFBWjtBQUNEOzs7V0FFRCx5QkFBZ0I7QUFDZCxXQUFLQSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7Ozs7OztBQUdILFNBQVNnRixjQUFULENBQXdCSSxHQUF4QixFQUE2QjtBQUMzQixNQUFNQyxxQkFBcUIsR0FBRztBQUM1QkMsV0FBTyxFQUFFLElBRG1CO0FBRTVCQyxhQUFTLEVBQUUsSUFGaUI7QUFHNUJDLGFBQVMsRUFBRSxJQUhpQjtBQUk1QkMsYUFBUyxFQUFFO0FBSmlCLEdBQTlCO0FBTUEsU0FBT0oscUJBQXFCLENBQUNELEdBQUcsQ0FBQ2xDLElBQUwsQ0FBckIsR0FDSDtBQUFFd0MsS0FBQyxFQUFFTixHQUFHLENBQUNPLE9BQVQ7QUFBa0JDLEtBQUMsRUFBRVIsR0FBRyxDQUFDUztBQUF6QixHQURHLEdBRUgsSUFGSjtBQUdEOztBQUVELFNBQVNwQixrQkFBVCxDQUE0QnFCLE9BQTVCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUM5QyxvQkFBV0EsU0FBWCxjQUF3QkQsT0FBTyxDQUFDRSxZQUFSLENBQXFCRCxTQUFyQixDQUF4QjtBQUNEOztBQUVEaEYsTUFBTSxDQUFDa0YsYUFBUCxHQUF1QixJQUFJbEcsYUFBSixFQUF2QjtBQUNBZ0IsTUFBTSxDQUFDa0YsYUFBUCxDQUFxQkMsS0FBckIiLCJmaWxlIjoiLi9zcmMvY29udGVudC1zY3JpcHRzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2ZW50c1RvUmVjb3JkIGZyb20gXCIuLi9jb2RlLWdlbmVyYXRvci9kb20tZXZlbnRzLXRvLXJlY29yZFwiO1xuaW1wb3J0IHsgZGVmYXVsdEJpbmRUYWdzIH0gZnJvbSBcIi4uL2NvZGUtZ2VuZXJhdG9yL2VsZW1lbnRzLXRvLWJpbmQtdG9cIjtcbi8vIGltcG9ydCB7IGZpbmRlciB9IGZyb20gXCIuLi9jb2RlLWdlbmVyYXRvci9hbGF1ZGEtZmluZGVyXCI7XG5pbXBvcnQgZmluZGVyIGZyb20gXCJAbWVkdi9maW5kZXJcIjtcbmltcG9ydCBwcHRyQWN0aW9ucyBmcm9tIFwiLi4vY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zXCI7XG5cbmltcG9ydCAqIGFzIGRlbGVnYXRlIGZyb20gXCJkZWxlZ2F0ZVwiO1xuXG4vLyBub3RlOiDpnIDopoHlsL3ph4/pgb/lhY1hdWktaW5wdXTnmoTljLnphY1cbmV4cG9ydCBjb25zdCBtYXRjaENsYXNzTmFtZXMgPSBbXG4gIFwiYXVpLXNlYXJjaFwiLFxuICBcImF1aS1idXR0b25cIixcbiAgXCJhdWktc2VsZWN0XCIsXG4gIFwiYXVpLWFjY29yZGlvblwiLFxuICBcImF1aS1icmVhZGNydW1iXCIsXG4gIFwiYXVpLW5hdlwiLFxuICBcImF1aS1mb3JtXCIsXG4gIFwiYXVpLWljb25cIixcbiAgXCJhdWktdGFiXCIsXG4gIFwiYXVpLXRvb2x0aXBcIixcbiAgXCJhdWktb3B0aW9uXCIsXG4gIFwiYWNsLWRpc2FibGVkLWNvbnRhaW5lclwiLFxuICBcImFjbC1cIixcbiAgXCJyYy1cIixcbl07XG5cbi8vIG5lZWQgYWRkIHByZSBjb21tYW5kIGxpbmVzIGVsZW1lbnRzXG5leHBvcnQgY29uc3QgbmVlZEFkZFByZUNMRWxlbWVudHMgPSBbXG4gIFxuXVxuXG5cbmNsYXNzIEV2ZW50UmVjb3JkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50TG9nID0gW107XG4gICAgdGhpcy5wcmV2aW91c0V2ZW50ID0gbnVsbDtcbiAgICB0aGlzLnByZXZpb3VzUm91dGVyID0gbnVsbDtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJvcHRpb25zXCJdLCAoeyBvcHRpb25zIH0pID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YUF0dHJpYnV0ZSB9ID0gb3B0aW9ucyA/IG9wdGlvbnMuY29kZSA6IHt9O1xuICAgICAgY29uc3Qgc3RhcnRDb250ZXh0ID0gdGhpcztcbiAgICAgIGlmIChkYXRhQXR0cmlidXRlKSB7XG4gICAgICAgIHRoaXMuZGF0YUF0dHJpYnV0ZSA9IGRhdGFBdHRyaWJ1dGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHlpbnRlc3Qg55uR5ZCsIHB1c2hzdGF0ZVxuICAgICAgLy8gY29uc3QgX2hpc3RvcnlXcmFwID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgLy8gICBjb25zdCBvcmlnID0gd2luZG93Lmhpc3RvcnlbdHlwZV07XG4gICAgICAvLyAgIGNvbnN0IGUgPSBuZXcgRXZlbnQodHlwZSk7XG4gICAgICAvLyAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIC8vICAgICBjb25zdCBydiA9IG9yaWcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIC8vICAgICBlLmFyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIC8vICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgIC8vICAgICByZXR1cm4gcnY7XG4gICAgICAvLyAgIH07XG4gICAgICAvLyB9O1xuICAgICAgLy8gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gX2hpc3RvcnlXcmFwKFwicHVzaFN0YXRlXCIpO1xuICAgICAgLy8gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID0gX2hpc3RvcnlXcmFwKFwicmVwbGFjZVN0YXRlXCIpO1xuXG4gICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInB1c2hTdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIHB1c2hTdGF0ZVwiLCBlKTtcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXBsYWNlU3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcImNoYW5nZSByZXBsYWNlU3RhdGVcIiwgZSk7XG4gICAgICAvLyB9KTtcblxuICAgICAgY29uc3QgZXZlbnRzID0gT2JqZWN0LnZhbHVlcyhldmVudHNUb1JlY29yZCk7XG4gICAgICBpZiAoIXdpbmRvdy5wcHRSZWNvcmRlckFkZGVkQ29udHJvbExpc3RlbmVycykge1xuICAgICAgICB0aGlzLmFkZEFsbExpc3RlbmVycyhkZWZhdWx0QmluZFRhZ3MsIGV2ZW50cyk7XG4gICAgICAgIHdpbmRvdy5wcHRSZWNvcmRlckFkZGVkQ29udHJvbExpc3RlbmVycyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXdpbmRvdy5kb2N1bWVudC5wcHRSZWNvcmRlckFkZGVkQ29udHJvbExpc3RlbmVycyAmJlxuICAgICAgICBjaHJvbWUucnVudGltZSAmJlxuICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2VcbiAgICAgICkge1xuICAgICAgICBjb25zdCBib3VuZGVkR2V0Q3VycmVudFVybCA9IHRoaXMuZ2V0Q3VycmVudFVybC5iaW5kKHRoaXMpO1xuICAgICAgICBjb25zdCBib3VuZGVkR2V0Vmlld1BvcnRTaXplID0gdGhpcy5nZXRWaWV3UG9ydFNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGJvdW5kZWRHZXRDdXJyZW50VXJsKTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGJvdW5kZWRHZXRWaWV3UG9ydFNpemUpO1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQucHB0UmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnMgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJmaXJzdFJ1blwiLCBmdW5jdGlvbihpdGVtcykge1xuICAgICAgICBpZiAoIWl0ZW1zLmhhc093blByb3BlcnR5KFwiZmlyc3RSdW5cIikpIHtcbiAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBmaXJzdFJ1bjogMCB9KTtcbiAgICAgICAgICBpdGVtcy5maXJzdFJ1biA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoXCJmaXJzdFJ1blwiKSAmJiAhaXRlbXMuZmlyc3RSdW4pIHtcbiAgICAgICAgICBzdGFydENvbnRleHQuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgY29udHJvbDogXCJnZXQtdmlld3BvcnQtc2l6ZVwiLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3RhcnRDb250ZXh0LnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGNvbnRyb2w6IFwiZ2V0LWN1cnJlbnQtdXJsXCIsXG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBmaXJzdFJ1bjogMSB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoeyBjb250cm9sOiBcImV2ZW50LXJlY29yZGVyLXN0YXJ0ZWRcIiB9KTtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJDeXByZXNzIFJlY29yZGVyIGluLXBhZ2UgRXZlbnRSZWNvcmRlciBzdGFydGVkXCIpO1xuXG4gICAgICAvLyDnu5Hlrpphbmd1bGFyIGV2ZW50IHJvdXRlciBlbmRcbiAgICAgIGlmICh3aW5kb3cuX2N5X25hdmlnYXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiX2N5X25hdmlnYXRlXCIsIHdpbmRvdy5fY3lfbmF2aWdhdGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkQWxsTGlzdGVuZXJzKGVsZW1lbnRzLCBldmVudHMpIHtcbiAgICBjb25zdCBib3VuZGVkUmVjb3JkRXZlbnQgPSB0aGlzLnJlY29yZEV2ZW50LmJpbmQodGhpcyk7XG4gICAgZXZlbnRzLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGJvdW5kZWRSZWNvcmRFdmVudCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZW5kTWVzc2FnZShtc2cpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwic2VuZGluZyBtZXNzYWdlXCIsIG1zZyk7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHBvb3IgbWFuJ3Mgd2F5IG9mIGRldGVjdGluZyB3aGV0aGVyIHRoaXMgc2NyaXB0IHdhcyBpbmplY3RlZCBieSBhbiBhY3R1YWwgZXh0ZW5zaW9uLCBvciBpcyBsb2FkZWQgZm9yXG4gICAgICAvLyB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgICBpZiAoY2hyb21lLnJ1bnRpbWUgJiYgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlKSB7XG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmV2ZW50TG9nLnB1c2gobXNnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJjYXVnaHQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gIH1cblxuICBnZXRDdXJyZW50VXJsKG1zZykge1xuICAgIGlmIChtc2cuY29udHJvbCAmJiBtc2cuY29udHJvbCA9PT0gXCJnZXQtY3VycmVudC11cmxcIikge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcInNlbmRpbmcgY3VycmVudCB1cmw6XCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBjb250cm9sOiBtc2cuY29udHJvbCxcbiAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdQb3J0U2l6ZShtc2cpIHtcbiAgICBpZiAobXNnLmNvbnRyb2wgJiYgbXNnLmNvbnRyb2wgPT09IFwiZ2V0LXZpZXdwb3J0LXNpemVcIikge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcInNlbmRpbmcgY3VycmVudCB2aWV3cG9ydCBzaXplXCIpO1xuICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XG4gICAgICAgIGNvbnRyb2w6IG1zZy5jb250cm9sLFxuICAgICAgICBjb29yZGluYXRlczogeyB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWNvcmRFdmVudChlKSB7XG4gICAgaWYgKHRoaXMucHJldmlvdXNFdmVudCAmJiB0aGlzLnByZXZpb3VzRXZlbnQudGltZVN0YW1wID09PSBlLnRpbWVTdGFtcClcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLnByZXZpb3VzRXZlbnQgPSBlO1xuICAgIC8vIHlpbnRlc3Qg5Yik5patdXJs5piv5ZCm5Y+R55Sf5LqG5pS55Y+YXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmICE9PSB0aGlzLnByZXZpb3VzUm91dGVyKSB7XG4gICAgICB0aGlzLnByZXZpb3VzUm91dGVyID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICBhY3Rpb246IHBwdHJBY3Rpb25zLk5BVklHQVRFLFxuICAgICAgICBocmVmOiB0aGlzLnByZXZpb3VzUm91dGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZU9wdGlvbnMgPSB7XG4gICAgICBjbGFzc05hbWU6IChuYW1lKSA9PiBtYXRjaENsYXNzTmFtZXMuc29tZSgoaXRlbSkgPT4gbmFtZS5pbmNsdWRlcyhpdGVtKSksXG4gICAgICB0YWdOYW1lOiAobmFtZSkgPT4gbWF0Y2hDbGFzc05hbWVzLnNvbWUoKGl0ZW0pID0+IG5hbWUuaW5jbHVkZXMoaXRlbSkpLFxuICAgICAgYXR0cjogKG5hbWUsIHZhbHVlKSA9PiBuYW1lLmluY2x1ZGVzKFwiZGF0YS1jeVwiKSxcbiAgICAgIGlkTmFtZTogKG5hbWUpID0+ICFuYW1lLmluY2x1ZGVzKFwiY2RrLVwiKSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VsZWN0b3IgPVxuICAgICAgZS50YXJnZXQuaGFzQXR0cmlidXRlICYmIGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmRhdGFBdHRyaWJ1dGUpXG4gICAgICAgID8gZm9ybWF0RGF0YVNlbGVjdG9yKGUudGFyZ2V0LCB0aGlzLmRhdGFBdHRyaWJ1dGUpXG4gICAgICAgIDogZmluZGVyKGUudGFyZ2V0LCB7XG4gICAgICAgICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgICAgICAgIHNlZWRNaW5MZW5ndGg6IDEsXG4gICAgICAgICAgICBvcHRpbWl6ZWRNaW5MZW5ndGg6IDIsXG4gICAgICAgICAgfSk7XG5cbiAgICBjb25zdCBtc2cgPSB7XG4gICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICBmdWxsU2VsZWN0b3I6IGZpbmRlcihlLnRhcmdldCwge1xuICAgICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgICAgc2VlZE1pbkxlbmd0aDogMTAsXG4gICAgICAgIG9wdGltaXplZE1pbkxlbmd0aDogMTAsXG4gICAgICB9KSxcbiAgICAgIHZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgIHRhZ05hbWU6IGUudGFyZ2V0LnRhZ05hbWUsXG4gICAgICB0YXJnZXRUeXBlOiBlLnRhcmdldC50eXBlLFxuICAgICAgYWN0aW9uOiBlLnR5cGUsXG4gICAgICBrZXlDb2RlOiBlLmtleUNvZGUgPyBlLmtleUNvZGUgOiBudWxsLFxuICAgICAgaHJlZjogZS50YXJnZXQuaHJlZiA/IGUudGFyZ2V0LmhyZWYgOiBudWxsLFxuICAgICAgY29vcmRpbmF0ZXM6IGdldENvb3JkaW5hdGVzKGUpLFxuICAgICAgdGFyZ2V0T2JqZWN0OiBlLnRhcmdldCxcbiAgICAgIHRhcmdldFRleHQ6IGUudGFyZ2V0LmlubmVyVGV4dCxcbiAgICB9O1xuXG4gICAgdGhpcy5zZW5kTWVzc2FnZShtc2cpO1xuICB9XG5cbiAgZ2V0RXZlbnRMb2coKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRMb2c7XG4gIH1cblxuICBjbGVhckV2ZW50TG9nKCkge1xuICAgIHRoaXMuZXZlbnRMb2cgPSBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb29yZGluYXRlcyhldnQpIHtcbiAgY29uc3QgZXZlbnRzV2l0aENvb3JkaW5hdGVzID0ge1xuICAgIG1vdXNldXA6IHRydWUsXG4gICAgbW91c2Vkb3duOiB0cnVlLFxuICAgIG1vdXNlbW92ZTogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IHRydWUsXG4gIH07XG4gIHJldHVybiBldmVudHNXaXRoQ29vcmRpbmF0ZXNbZXZ0LnR5cGVdXG4gICAgPyB7IHg6IGV2dC5jbGllbnRYLCB5OiBldnQuY2xpZW50WSB9XG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRhU2VsZWN0b3IoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gIHJldHVybiBgWyR7YXR0cmlidXRlfT0ke2VsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSl9XWA7XG59XG5cbndpbmRvdy5ldmVudFJlY29yZGVyID0gbmV3IEV2ZW50UmVjb3JkZXIoKTtcbndpbmRvdy5ldmVudFJlY29yZGVyLnN0YXJ0KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/content-scripts/index.js\n");

/***/ })

/******/ });