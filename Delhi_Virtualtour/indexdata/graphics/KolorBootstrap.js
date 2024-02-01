//krpano instance
var krpano = null;
//trace
var debug = false;
//is krpano loaded
var krpanoLoaded = false;
//methods to call when plugin is loaded
var pluginLoaded = new ktools.Map();
//is tour started
var isTourStarted = false;
//fullscreen object
var kolorFullscreen = null;
//browser detection
var kolorBrowserDetect = null;
//start z-index value
var kolorStartIndex = 4000;
//target url for cross domains application
var crossDomainTargetUrl = '';
var tourLanguage;

if ( debug ) {
	if ( typeof(console) == 'undefined' ) {
		console = {log : function (text) {} };
	}
}

/* ======== FULLSCREEN STUFF ========================================== */

/**
 * @description Register Fullscreen on DOM ready.
 */
jQuery(document).ready(function() {
	//add browser detection
	kolorBrowserDetect = new ktools.BrowserDetect();
	kolorBrowserDetect.init();
	//kolorBrowserDetect.browser : Browser string
	//kolorBrowserDetect.version : Browser version
	//kolorBrowserDetect.OS : Platform OS
	
	//add fullscreen
	kolorFullscreen = new ktools.Fullscreen(document.getElementById("tourDIV"));
	kolorFullscreen.supportsFullscreen();
	//activate krpano fallback and update methods
	kolorFullscreen.setExternal({
		'enter': krPanoFullscreenEnter,
		'exit': krPanoFullscreenExit,
		'change': krpanoFullscreenChange,
		'resize': krPanoFullscreenResize
	});
});

/**
 * @function
 * @description Enter fullscreen fallback method for krpano.
 * @return {void}
 */
function krPanoFullscreenEnter() {
	getKrPanoInstance().call("enterFullScreenFallback");
}

/**
 * @function
 * @description Exit fullscreen fallback method for krpano.
 * @return {void}
 */
function krPanoFullscreenExit() {
	getKrPanoInstance().call("exitFullScreenFallback");
}

/**
 * @function
 * @description Launch method for krpano on fullscreen change event.
 * @param {Boolean} state If true enter fullscreen event, else exit fullscreen event.
 * @return {void}
 */
function krpanoFullscreenChange(state) {
	if(state){
		getKrPanoInstance().call("enterFullScreenChangeEvent");
	}else{
		getKrPanoInstance().call("exitFullScreenChangeEvent");
	}
}

/**
 * @function
 * @description Launch resize method for krpano correct resize.
 * @return {void}
 */
function krPanoFullscreenResize() {
	getKrPanoInstance().call("resizeFullScreenEvent");
}

/**
 * @function
 * @description Set fullscreen mode.
 * @param {String|Boolean} value The fullscreen status: 'true' for open or 'false' for close.
 * @return {void}
 */
function setFullscreen(value) {
	var state;
	if(typeof value == "string")
		state = (value.toLowerCase() == "true");
	else
		state = Boolean(value);

	if (kolorFullscreen) {
		if(state){
			kolorFullscreen.request();
		}else{
			kolorFullscreen.exit();
		}
	}
}

/* ========== DIALOG BETWEEN KRPANO/JS STUFF ================================= */

/**
 * @function
 * @description Get krpano instance.
 * @return {Object} krpano instance.
 */
function getKrPanoInstance() {
	if ( krpano == null ) {
		krpano = document.getElementById('krpanoSWFObject');
	}
	return krpano;
}

/**
 * @function
 * @description Call krpano function.
 * @param {String} fnName The krpano action name.
 * @param {*} Following parameters are passed to the krPano function
 * @return {void}
 */
function invokeKrFunction(fnName) {
	var args = [].slice.call(arguments, 1);
	var callString = fnName+'(';
	for(var i=0, ii=args.length; i<ii; i++)
	{
		callString += args[i];
		if(i != ii-1) { callString += ', '; }
	}
	callString += ');';
	if(getKrPanoInstance() !== null)
	{
		getKrPanoInstance().call(callString);
	}
}

/**
 * @function
 * @description Get krpano identifier value.
 * @param {String} identifier The qualifier.
 * @param {String} type The converting type. Can be: 'int', 'float', 'string', 'boolean', 'object'.
 * @return {Object}
 */
function getKrValue(identifier, type) {
	if ( typeof identifier == "undefined" ){
		return identifier;
	}
	
	if(getKrPanoInstance() !== null)
	{
		if(getKrPanoInstance().get(identifier) == null) {
			return null;
		}

		switch ( type ) {
			case "int":
				return parseInt(getKrPanoInstance().get(identifier));
			case "float":
				return parseFloat(getKrPanoInstance().get(identifier));
			case "string":
				return String(getKrPanoInstance().get(identifier));
			case "bool":
				return Boolean(getKrPanoInstance().get(identifier) === 'true' || parseInt(getKrPanoInstance().get(identifier)) === 1 || getKrPanoInstance().get(identifier) === 'yes' || getKrPanoInstance().get(identifier) === 'on');
			default:
				return getKrPanoInstance().get(identifier);
		}
	}
	else
	{
		return null;
	}
}

/**
 * @function
 * @description Invoke a function of a plugin engine.
 * @param {String} pluginName The name/id of the plugin.
 * @param {String} functionName The name of the function to invoke.
 * @param {Object[]} arguments Additional arguments will be passed to the invoked function as an array.
 * @return {Object}
 */
function invokePluginFunction(pluginName, functionName) {
	if ( debug ) {
		console.log("invokePluginFunction("+pluginName+", "+functionName+")");
	}
	
	var plugin = ktools.KolorPluginList.getInstance().getPlugin(pluginName);
	if (plugin == null) {
		if ( debug ) { console.log("invokePluginFunction: plugin instance doesn't exist"); }
		if(pluginLoaded && pluginLoaded.item(pluginName)){
			pluginLoaded.update(pluginName, arguments);
		}else{
			pluginLoaded.add(pluginName, arguments);
		}
		return false;
	}
	var engine = plugin.getRegistered();
	if (engine == null) {
		if ( debug ) { console.log("invokePluginFunction: plugin isn't registered"); }
		if(pluginLoaded && pluginLoaded.item(pluginName)){
			pluginLoaded.update(pluginName, arguments);
		}else{
			pluginLoaded.add(pluginName, arguments);
		}
		return false;
	}
	var restArgs = [].slice.call(arguments, 2);
	return engine[functionName](restArgs);
}

/**
 * @function
 * @description This function is called when krpano is ready.
 * The ready state of krpano is told by its event onready (in fact it's not fully ready, included XML are not necessarily loaded) 
 * @return {void}
 */
function eventKrpanoLoaded (isWebVr) {
	if ( debug ) {
		console.log('krpano is loaded');
	}
	
	if (krpanoLoaded) { return false; }
	
	tourLanguage = getKrValue("tour_language","string")
	if(typeof tourLanguage == "undefined"){
		tourLanguage = 'en';
	}
	ktools.I18N.getInstance().initLanguage(tourLanguage, crossDomainTargetUrl+'indexdata/index_messages_','.xml');
	krpanoLoaded = true;
	
	if(isWebVr){
	
	addKolorAnalytics('analytics');

	}else{
	
	addKolorBox('socialShare');
addKolorAnalytics('analytics');
addKolorMenu('panoramaMenu');

	}
}

/**
 * @function
 * @description This function is called when plugins must be unloaded.
 * @return {void}
 */
function eventUnloadPlugins () {
	resetValuesForPlugins();

	deleteKolorMenu('panoramaMenu');
deleteKolorAnalytics('analytics');
deleteKolorBox('socialShare');

}

/**
 * @function
 * @description Reset the default values for the player and plugins loaders.
 * @return {void}
 */
function resetValuesForPlugins () {
	krpano = null;
	krpanoLoaded = false;
	isTourStarted = false;
	pluginLoaded = new ktools.Map();
	kolorStartIndex = 4000;
}

/**
 * @function
 * @description This function is called when tour is started.
 * @return {void}
 */
function eventTourStarted () {
	if ( debug ) {
		console.log('tour is started');
	}
	
	isTourStarted = true;
}

/**
 * @function
 * @description This function is called when tour language is updated.
 * @return {void}
 */
function eventTourChangeLanguage (pLang) {
	if ( debug ) {
		console.log('change tour language : '+pLang);
	}
	
	ktools.I18N.getInstance().initLanguage(pLang, crossDomainTargetUrl+'indexdata/index_messages_','.xml');
}


/* ========= KOLOR PLUGINS SCRIPTS ============================== */


/**
 * @function
 * @description Add an instance of kolorMenu JS Engine, loads JS and CSS files then init and populate related plugin that's based on it.
 * @param {String} pPlugID The name of the plugin you want to give to the kolorBox instance. 
 * @return {void} 
 */
function addKolorMenu(pPlugID) 
{
	if(typeof ktools.KolorPluginList.getInstance().getPlugin(pPlugID) == "undefined")
	{
		var kolorMenuCSS = new ktools.CssStyle("KolorMenuCSS", crossDomainTargetUrl+"indexdata/graphics/KolorMenu/kolorMenu.css");
		var kolorMenuJS = new ktools.Script("KolorMenuJS", crossDomainTargetUrl+"indexdata/graphics/KolorMenu/KolorMenu.min.js", [], true);
		var kolorMenuPlugin = new ktools.KolorPlugin(pPlugID);
		kolorMenuPlugin.addScript(kolorMenuJS);
		kolorMenuPlugin.addCss(kolorMenuCSS);
		ktools.KolorPluginList.getInstance().addPlugin(kolorMenuPlugin.getPluginName(), kolorMenuPlugin, true);
	}
}

/**
 * @function
 * @description Create KolorMenu and/or display it if exists.
 * @param {String} pPlugID The name of the plugin you want to init and show.
 * @return {void} 
 */
function openKolorMenu(pPlugID)
{
	if(debug) { console.log("openKolorMenu "+pPlugID); }
	
	if(!ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() || !ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized() || typeof KolorMenu == "undefined"){
		createKolorMenu(pPlugID);
	} else {
		ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered().showKolorMenu();
	}
}

/**
 * @function
 * @description Init, populate and show the kolorMenu.
 * @param {String} pPlugID The name of the plugin you want to init and show.
 * @return {void} 
 */
function createKolorMenu(pPlugID)
{	
	if(debug) { console.log("createKolorMenu "+pPlugID); }

	//Check if the KolorMenu is loaded
	if(!ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized()  || typeof KolorMenu == "undefined")
	{
		err = "KolorMenu JS or XML is not loaded !";
		if(debug){ console.log(err); }
		//If not loaded, retry in 100 ms
		setTimeout(function() { createKolorMenu(pPlugID); }, 100);
		return;
	}

	//Check if the KolorMenu is instantiate and registered with the ktools.Plugin Object
	//If not, instantiate the KolorMenu and register it.
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() == null)
	{
		ktools.KolorPluginList.getInstance().getPlugin(pPlugID).register(new KolorMenu(pPlugID, "panoDIV"));
	}
	
	//Get the registered instance of KolorMenu
	var kolorMenu = ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered();
	
	//If kolorMenu is not ready, populate datas
	if(!kolorMenu.isReady())
	{
		var kolorMenuOptions = [];
		
		//Build the Options data for the KolorMenu
		var optionLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].settings[0].option.count"));
	
		for(var i = 0; i < optionLength; i++)
		{
			if (getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].name","string") == 'zorder') {
				kolorMenuOptions[getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].name","string")] = kolorStartIndex + getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].value", getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].type", "string"));
			} else {
				kolorMenuOptions[getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].name","string")] = getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].value", getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].type", "string"));
			}
		}
		//add the device check
		kolorMenuOptions['device'] = getKrValue('vrtourdevice','string');
		//kolorMenuOptions['scale'] = getKrValue('vrtourdevicescale','float');
		kolorMenu.setKolorMenuOptions(kolorMenuOptions);
		
		var groupLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].internaldata[0].group.count"));
		var group = null;
		
		var itemLength = 0;
		var item = null;
		
		var itemOptionsLength = 0;
		
		for(var j = 0; j < groupLength; j++)
		{
			group = new KolorMenuObject();
			group.setName(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].name","string"));
			if(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].titleID","string") !== '')
				group.setTitle(ktools.I18N.getInstance().getMessage(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].titleID","string")));
			group.setI18nText(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].titleID","string"));
			group.setAction(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].action","string"));
			group.setThumbnail(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].thumbnail","string"));
			group.setSubMenu(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].subMenu","bool"));
			group.setCssClass(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].cssClass","string"));
			
			itemLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item.count"));
			
			for(var k = 0; k < itemLength; k++)
			{
				item = new KolorMenuObject();
				item.setName(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].name","string"));
				if(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].titleID","string") !== '')
					item.setTitle(ktools.I18N.getInstance().getMessage(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].titleID","string")));
				item.setI18nText(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].titleID","string"));
				item.setAction(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].action","string"));
				item.setThumbnail(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].thumbnail","string"));
				item.setCssClass(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].cssClass","string"));
				item.setParent(group);
				
				//Build the Options data for the item
				itemOptionsLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].option.count"));
				for(var l = 0; l < itemOptionsLength; l++)
				{
					item.addOption(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].option["+l+"].name","string"), getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].option["+l+"].value", getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].item["+k+"].option["+l+"].type", "string")));
				}
				
				group.addChild(item);
			}
			
			groupOptionsLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].option.count"));
			for(var m = 0; m < groupOptionsLength; m++)
			{
				group.addOption(getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].option["+m+"].name","string"), getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].option["+m+"].value", getKrValue("ptplugin["+pPlugID+"].internaldata[0].group["+j+"].option["+m+"].type", "string")));
			}
			
			kolorMenu.addKolorMenuGroup(group);
		}
		
		//KolorMenu is now ready
		kolorMenu.setReady(true);
		//call ready statement for krpano script
		invokeKrFunction("kolorMenuJsReady_"+pPlugID);
		
		//Display the menu
		kolorMenu.openKolorMenu();
	}
}

/**
 * @function
 * @description Update and populate kolorMenu.
 * @param {String} pPlugID The name of the plugin you want to update.
 * @return {void} 
 */
function updateKolorMenu(pPlugID)
{
	if(debug) { console.log("updateKolorMenu "+pPlugID); }

	//Check if the KolorMenu is loaded
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized() && typeof KolorMenu != "undefined" && ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() != null)
	{
		//Get the registered instance of KolorMenu
		var kolorMenu = ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered();
		
		//If kolorMenu is ready, update datas
		if(kolorMenu.isReady())
		{
			var groups = kolorMenu.getKolorMenuGroups();
			var groupsLength = groups.size();
			var itemsLength = 0;
			var group, item;
			
			for(var i = 0; i < groupsLength; i++)
			{
				group = groups.get(i);
				itemsLength = group.getChildren().size();
				
				if(group.getSubMenu()){
					group.setTitle(ktools.I18N.getInstance().getMessage(group.getI18nText()));
				}
				
				if(group.hasChildren() && itemsLength > 0){
					for(var j = 0; j < itemsLength; j++){
						item = group.getChildren().get(j);
						item.setTitle(ktools.I18N.getInstance().getMessage(item.getI18nText()));
					}
				}
			}
		}
	}
}

/**
 * @function
 * @description Delete kolorMenu.
 * @param {String} pPlugID The name of the plugin you want to delete.
 * @return {void} 
 */
function deleteKolorMenu(pPlugID)
{
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID)){
		ktools.KolorPluginList.getInstance().removePlugin(pPlugID);
	}
	var parent = document.getElementById("panoDIV");
	var child = document.getElementById(pPlugID);
	if(parent && child){
		parent.removeChild(child);
	}
}


/**
 * @function
 * @description Add an instance of KolorAnalytics JS Engine, loads JS and CSS files then init and populate related plugin that's based on it.
 * @param {String} pPlugID The name of the plugin you want to give to the kolorAnalytics instance.
 * @return {void} 
 */
function addKolorAnalytics(pPlugID) 
{
	if(typeof ktools.KolorPluginList.getInstance().getPlugin(pPlugID) == "undefined")
	{
		var kolorAnalyticsJS = new ktools.Script("KolorAnalyticsJS", crossDomainTargetUrl+"indexdata/graphics/KolorAnalytics/KolorAnalytics.min.js", [], true);
		var kolorAnalyticsPlugin = new ktools.KolorPlugin(pPlugID);
		kolorAnalyticsPlugin.addScript(kolorAnalyticsJS);
		ktools.KolorPluginList.getInstance().addPlugin(kolorAnalyticsPlugin.getPluginName(), kolorAnalyticsPlugin, true);

		//generate it
		if(!ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() || !ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized() || typeof KolorAnalytics == "undefined"){
			createKolorAnalytics(pPlugID);
		}
	}
}

/**
 * @function
 * @description Init, populate and show the KolorAnalytics.
 * @param {String} pPlugID The name of the plugin you want to init and show.
 * @return {void} 
 */
function createKolorAnalytics(pPlugID)
{
	if(debug) { console.log("createKolorAnalytics "+pPlugID); }

	//Check if the KolorAnalytics is loaded
	if(!ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized()  || typeof KolorAnalytics == "undefined")
	{
		err = "KolorAnalytics JS or XML is not loaded !";
		if(debug){ console.log(err); }
		//If not loaded, retry in 100 ms
		setTimeout(function() { createKolorAnalytics(pPlugID); }, 100);
		return;
	}

	//Check if the KolorAnalytics is instantiate and registered with the ktools.Plugin Object
	//If not, instantiate the KolorAnalytics and register it.
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() == null)
	{
		ktools.KolorPluginList.getInstance().getPlugin(pPlugID).register(new KolorAnalytics(pPlugID, "panoDIV"));
	}
	
	//Get the registered instance of KolorAnalytics
	var kolorAnalytics = ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered();
	
	//If KolorAnalytics is not ready, populate datas
	if(!kolorAnalytics.isReady())
	{
		var kolorAnalyticsOptions = [];
		
		//Build the Options data for the KolorAnalytics
		var optionLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].settings[0].option.count"));
	
		for(var i = 0; i < optionLength; i++)
		{
			kolorAnalyticsOptions[getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].name","string")] = getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].value", getKrValue("ptplugin["+pPlugID+"].settings[0].option["+i+"].type", "string"));
		}
		
		kolorAnalytics.setKolorAnalyticsOptions(kolorAnalyticsOptions);
		
		//KolorAnalytics is now ready
		kolorAnalytics.setReady(true);

		//call ready statement for krpano script
		invokeKrFunction("kolorAnalyticsJsReady_"+pPlugID);
		
		//Display the KolorAnalytics
		kolorAnalytics.generateKolorAnalytics();
	}
}

/**
 * @function
 * @description Update and populate KolorAnalytics.
 * @param {String} pPlugID The name of the plugin you want to update.
 * @param {String} pLang The language used by the plugin.
 * @return {void} 
 */
function updateKolorAnalytics(pPlugID,pLang)
{
	if(debug) { console.log("updateKolorAnalytics "+pPlugID); }

	//Check if the KolorAnalytics is loaded
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized() && typeof KolorAnalytics != "undefined" && ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() != null)
	{
		//TODO
	}
}

/**
 * @function
 * @description Delete KolorAnalytics.
 * @param {String} pPlugID The name of the plugin you want to delete.
 * @return {void} 
 */
function deleteKolorAnalytics(pPlugID)
{
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID)){
		ktools.KolorPluginList.getInstance().removePlugin(pPlugID);
	}
}


/**
 * @function
 * @description Add an instance of kolorBox JS Engine, loads JS and CSS files then init and populate related plugin that's based on it.
 * @param {String} pPlugID The name of the plugin you want to give to the kolorBox instance. 
 * @return {void} 
 */
function addKolorBox(pPlugID)
{
	
	if(typeof ktools.KolorPluginList.getInstance().getPlugin(pPlugID) == "undefined")
	{
		var kolorBoxCSS = new ktools.CssStyle("KolorBoxCSS", crossDomainTargetUrl+"indexdata/graphics/KolorBox/kolorBox.css");
		var kolorBoxJS = new ktools.Script("KolorBoxJS", crossDomainTargetUrl+"indexdata/graphics/KolorBox/KolorBox.min.js", [], true);
		var kolorBoxPlugin = new ktools.KolorPlugin(pPlugID);
		kolorBoxPlugin.addScript(kolorBoxJS);
		kolorBoxPlugin.addCss(kolorBoxCSS);
		ktools.KolorPluginList.getInstance().addPlugin(kolorBoxPlugin.getPluginName(), kolorBoxPlugin, true);
		showKolorBox(pPlugID, 0, true);
	}
}

/**
 * @function
 * @description Init, populate and show the kolorBox. You can init only.
 * @param {String} pPlugID The name of the plugin you want to init and/or show.
 * @param {Number} pIndex The index you want to open, supposing your kolorBox is populated by a list of items (gallery case).
 * @param {Boolean} pInitOnly If this param is true, just populate the kolorBox engine with the XML data without opening it.
 * @return {void} 
 */
function showKolorBox(pPlugID, pIndex, pInitOnly)
{
	if(debug) { console.log("showKolorBox " + pPlugID); }
	
	//Check if the KolorBox is loaded
	if(!ktools.KolorPluginList.getInstance().getPlugin(pPlugID).isInitialized() || typeof KolorBox === "undefined")
	{
		err = "KolorBox JS or XML is not loaded !";
		if(debug){ console.log(err); }
		//If not loaded, retry in 100 ms
		setTimeout(function() { showKolorBox(pPlugID, pIndex, pInitOnly); }, 100);
		return;
	}
	
	//Check if the KolorBox is instantiate and registered with the ktools.Plugin Object
	//If not, instantiate the KolorBox and register it.
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered() === null)
	{
		ktools.KolorPluginList.getInstance().getPlugin(pPlugID).register(new KolorBox(pPlugID, "panoDIV"));
	}
	
	//Get the registered instance of KolorBox
	var kolorBox = ktools.KolorPluginList.getInstance().getPlugin(pPlugID).getRegistered();

	//If kolorBox is not ready, populate datas
	if(!kolorBox.isReady())
	{
		var kolorBoxOptions = [];
		var optionName = '';
		var optionValue = '';
		
		//Build the Options data for the KolorBox
		var optionLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].settings[0].option.count"));
	
		for(var j = 0; j < optionLength; j++)
		{
			optionName = getKrValue("ptplugin["+pPlugID+"].settings[0].option["+j+"].name","string");
			if (optionName == 'zorder') {
				optionValue = kolorStartIndex + getKrValue("ptplugin["+pPlugID+"].settings[0].option["+j+"].value", getKrValue("ptplugin["+pPlugID+"].settings[0].option["+j+"].type", "string"));
			} else {
				optionValue = getKrValue("ptplugin["+pPlugID+"].settings[0].option["+j+"].value", getKrValue("ptplugin["+pPlugID+"].settings[0].option["+j+"].type", "string"));
			}
			kolorBoxOptions[optionName] = optionValue;
		}
		//add the device check
		kolorBoxOptions['device'] = getKrValue('vrtourdevice','string');
		//kolorBoxOptions['scale'] = getKrValue('vrtourdevicescale','float');
		kolorBox.setKolorBoxOptions(kolorBoxOptions);
		
		if(kolorBoxOptions['starts_opened']) {
			pInitOnly = false;
		}
		
		//Build the Items data for the KolorBox
		var kbItem = null;
		var itemLength = parseInt(getKrPanoInstance().get("ptplugin["+pPlugID+"].internaldata[0].item.count"));
		for(var k = 0; k < itemLength; k++)
		{
			//Build a new item
			kbItem = new KolorBoxObject();
			kbItem.setName(getKrValue("ptplugin["+pPlugID+"].internaldata[0].item["+k+"].name","string"));
			kbItem.setTitle(getKrValue("ptplugin["+pPlugID+"].internaldata[0].item["+k+"].title","string"));
			kbItem.setCaption(getKrValue("ptplugin["+pPlugID+"].internaldata[0].item["+k+"].caption","string"));
			kbItem.setValue(getKrValue("ptplugin["+pPlugID+"].internaldata[0].item["+k+"].value","string"));
			
			//If external data get n' set
			if(kbItem.getValue() === "externalData")
				kbItem.setData(getKrValue('data['+getKrValue("ptplugin["+pPlugID+"].internaldata[0].item["+k+"].dataName","string")+'].content', 'string'));
			
			//Add the item
			kolorBox.addKolorBoxItem(kbItem);

			kbItem.init();
		}

		//Kolorbox is now ready !
		kolorBox.setReady(true);
		//call ready statement for krpano script
		invokeKrFunction("kolorBoxJsReady_"+pPlugID);
	}
	
	//If id is defined, show this kolorBox
	if(typeof pPlugID !== "undefined" && (typeof pInitOnly === "undefined" || pInitOnly === false))
	{
		//If no index specified, set 0 as default index
		if(typeof pIndex === "undefined") { pIndex = 0; }
		kolorBox.openKolorBox(pIndex);
	}
	
	//If a plugin method has been called before registration the method is called now
	if(pluginLoaded && pluginLoaded.item(pPlugID)){
		invokePluginFunction.apply(null, pluginLoaded.item(pPlugID));
		pluginLoaded.remove(pPlugID);
	}
}

/**
 * @function
 * @description Delete kolorBox.
 * @param {String} pPlugID The name of the plugin you want to delete.
 * @return {void} 
 */
function deleteKolorBox(pPlugID)
{
	if(ktools.KolorPluginList.getInstance().getPlugin(pPlugID)){
		ktools.KolorPluginList.getInstance().removePlugin(pPlugID);
	}
	var parent = document.getElementById("panoDIV");
	var child = document.getElementById(pPlugID);
	if(parent && child){
		parent.removeChild(child);
	}
}