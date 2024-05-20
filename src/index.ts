// Import necessary Node.js modules
import replaceInFiles from "replace-in-files";
import { settings } from './settings';

/**
 * This function takes an object with oldImportPath and newImportPath properties and replaces oldImportPath with newImportPath in files.
 * It uses replaceInFiles module to search and replace paths in the setting files.
 * @param {Object} options - an object with oldImportPath and newImportPath properties
 * @returns {Array} - an array of file paths that were modified
 */
async function replaceImportPath({ oldImportPath, newImportPath }: {oldImportPath: string; newImportPath: string}) {
	const { paths } = await replaceInFiles({
		files: settings.projectFilesPathGlob,
		from: oldImportPath,
		to: newImportPath,
		saveOldFile: false,
		onlyFindPathsWithoutReplace: false,
	});
	return paths;
}


/**
 * This immediately invoked async function runs the code.
 * 
 */
(async () => {
	// Get the array of paths to fix from the "importsToFix" property in the "settings" object
	const pathsToFix = settings.importsToFix;

	// Loop through each path in the "pathsToFix" array
	for (const oldPath of pathsToFix) {

		// Custom logic to manipulate the old path to get a new one
		const pathArray = oldPath.split("/");
		pathArray.push(pathArray[pathArray.length - 1]);
		const newPath = pathArray.join("/");

		// Replace the old import path with the new one using the "replaceImportPath" function
		await replaceImportPath({
			oldImportPath: oldPath,
			newImportPath: newPath,
		});
	}

})();
