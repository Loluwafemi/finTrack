import { writeAsStringAsync, EncodingType, StorageAccessFramework, documentDirectory, getInfoAsync, cacheDirectory, copyAsync, makeDirectoryAsync} from 'expo-file-system'

import { isAvailableAsync, shareAsync } from 'expo-sharing'






const dedicatedPath = `${documentDirectory}Expense/report/`


const intializeSpace = async () => {
      try {
    await makeDirectoryAsync(dedicatedPath, { intermediates: true });
    console.log('Directory created successfully at', dedicatedPath);
  } catch (error) {
    console.error('Failed to create directory:', error);
  }
}

export async function SaveToHost(base64:string, name:string) {

    // intialize path by creating one and making sure to check before any action
    const filename = `/${name}.xlsx`
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    
    try {
        const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync(dedicatedPath)
        if(!permission.granted) return { status: false, message: "Permission Required!" }

        const output = await StorageAccessFramework.createFileAsync(permission.directoryUri, filename, filetype).then(async (workingPath)=>{
            console.log("workingPath: ", workingPath);
            
            await writeAsStringAsync(workingPath, base64, {
            encoding: EncodingType.Base64
            })
            return { status: true, message: "File saved" }

        })
        return output
    } catch (error) {
        console.log("Error Detected");
        console.log(error);
        return { status: false, message: "Error saving file. Try again." }
    }
    
}


export async function showListOfReport():Promise<string[]> {
    await intializeSpace()
    
    const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync(dedicatedPath)

    if(!permission.granted) return []

    try {
        const files = await StorageAccessFramework.readDirectoryAsync(permission.directoryUri)

        return files.reverse()
    } catch (error) {
        console.log("Error fetching file");
        console.log("error: ", error);
        return []
    }
}


export const openFile = async (path:string) => {
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const fileUri = cacheDirectory + fileName;

    try {
        // Copy the file to the cache directory
        await copyAsync({
        from: path,
        to: fileUri,
        });

        if(await isAvailableAsync()){
            await shareAsync(fileUri, {
                dialogTitle: "Open Report",
                mimeType: filetype
            })
        }else{
            console.log("Sharing not found");
        }
    } catch (error) {
        console.log("Error Detected");
        console.log(error);
        return { status: false, message: "Error saving file. Try again." }
    }
}