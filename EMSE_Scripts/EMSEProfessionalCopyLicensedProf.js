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


//var cap = "COM-NEW-22-001418";
var cap = aa.env.getValue("sCapId");
var result = aa.cap.getCapID(cap);
var sCapId= result.getOutput();

//var cap = "COM-NEW-22-001419";
var cap = aa.env.getValue("tCapId");
var result = aa.cap.getCapID(cap);
var tCapId= result.getOutput();

var appCreateResult = copyLicensedProf(sCapId,tCapId);

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