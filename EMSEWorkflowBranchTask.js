var debug ="";
showDebug = true;
showMessage = true;
var useProductScript = true;
var runEvent = false;
var SCRIPT_VERSION = 3.0;
servProvCode = aa.getServiceProviderCode();

function getScriptText(vScriptName, servProvCode, useProductScript) {
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance(
			"com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScript) {
			var emseScript = emseBiz.getMasterScript(aa
					.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(),
					vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", servProvCode, useProductScript));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS", servProvCode, useProductScript));
//eval(getScriptText("INCLUDES_CUSTOM", servProvCode, useProductScript));

//var wfstr= "Public Works Review";
//var wfstat= "Additional Info Required";
//var wfcomment= "EMSE branchTask test Comment";
//var wfnote= "EMSE branchTask test Note";
//var wfProcess= "BLDG_COM_GEN";
//var cap = "COM-NEW-22-001308";


var wfstr= aa.env.getValue("wfstr");
var wfstat= aa.env.getValue("wfstat");
var wfcomment= aa.env.getValue("wfcomment");
var wfnote= aa.env.getValue("wfnote");
var wfProcess= aa.env.getValue("wfProcess");

var cap = aa.env.getValue("capId");
var result = aa.cap.getCapID(cap);
var capId = result.getOutput();

var appCreateResult = branchTask(wfstr, wfstat, wfcomment, wfnote, wfProcess, capId);

if (debug.indexOf("**ERROR") > 0)
{
aa.env.setValue("ScriptReturnCode", "1");
aa.env.setValue("ScriptReturnMessage", debug);
aa.env.setValue("isSuccess", "false");
}
else
{
aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", message);
aa.env.setValue("ScriptReturnMessage", debug);
aa.env.setValue("isSuccess", "true");
//aa.env.setValue("ScriptReturnMessage", appCreateResult);
}
