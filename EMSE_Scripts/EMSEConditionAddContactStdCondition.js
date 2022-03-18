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


var contactSeqNum= aa.env.getValue("contactSeqNum");
var cType= aa.env.getValue("cType");
var cDesc= aa.env.getValue("cDesc");
var cStatus= aa.env.getValue("cStatus");

//Example
//var contactSeqNum= 1020094;
//var cType= "Building Permit";
//var cDesc= "As Built Plans";
//var cStatus= "Notice";
//var cap = "COM-NEW-22-003146";


var cap = aa.env.getValue("capId");
var result = aa.cap.getCapID(cap);
var capId = result.getOutput();
var appCreateResult = addContactStdCondition(contactSeqNum, cType, cDesc, cStatus, capId);


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