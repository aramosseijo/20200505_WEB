function togglePanel(field) {
	for(targetPanelName in panelFieldsDefs[field.name][field.value]) {
		var panelName = targetPanelName.toUpperCase();
		var targetPanel = document.getElementById(panelName);

		targetPanel.style.display = (panelFieldsDefs[field.name][field.value][targetPanelName] == 1) ? '' : 'none';
	}
}
