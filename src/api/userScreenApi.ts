
// import RNFS from 'react-native-fs';

// export const debugFilePath = async (videoPath: string) => {
//     try {
//         const exists = await RNFS.exists(videoPath);
//         if (!exists) {
//             console.error('File does not exist:', videoPath);
//             return false;
//         }
//         const stats = await RNFS.stat(videoPath);
//         console.log('File size:', stats.size, 'File type:', stats.type);
//         return true;
//     } catch (e) {
//         console.error('File check failed:', e);
//         return false;
//     }
// };


// export const uploadHealthVideo = async (videoPath: string) => {
//     try {
//       // 1. Use correct field name and values as in Postman
//       const fileName = videoPath.endsWith('.mp4') ? 'video.mp4' : 'video.mov';
//       const mimeType = videoPath.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';

//       const formData = new FormData();
//       formData.append('video', {
//         uri: videoPath,
//         type: mimeType,
//         name: fileName,
//       });


//       const response = await fetch('https://healthai-ezd5c9cgeecudbfn.canadacentral-01.azurewebsites.net/analyze', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         console.error('Server returned error:', response.status, errText);
//         throw new Error(`HTTP ${response.status}: ${errText}`);
//       }


//       const result = await response.json();
//       console.log('API success:', result);
//       return result;
//     } catch (error) {
//       console.log('Video upload error:');
//       console.error(error);
//       throw error;
//     }
//   };


// export const uploadHealthVideo = async (videoPath: string) => {
//     try {
//       const fileName = videoPath.endsWith('.mp4') ? 'video.mp4' : 'video.mov';
//       const mimeType = videoPath.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';
//       const uri = videoPath.startsWith('file://') ? videoPath : 'file://' + videoPath;

//       const formData = new FormData();
//       formData.append('video', { uri, type: mimeType, name: fileName });

//       console.log('Uploading video to API...');

//       const response = await fetch(
//         'https://healthai-ezd5c9cgeecudbfn.canadacentral-01.azurewebsites.net/analyze',
//         {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             // Don't set Content-Type — let fetch handle it
//           },
//           body: formData,
//         }
//       );

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         const text = await response.text();
//         console.error('Server returned error:', text);
//         throw new Error(`HTTP ${response.status}: ${text}`);
//       }

//       const result = await response.json();

//       console.log('API response data:', JSON.stringify(result, null, 2));

//       return result;
//     } catch (error) {
//       console.error('API call failed:', error);
//       throw error;
//     }
//   };


export const uploadHealthVideo = async (videoPath: string) => {
    try {

        const name = videoPath.endsWith('.mp4') ? 'video.mp4' : 'video.mov';
        const type = videoPath.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';
        const uri = videoPath.startsWith('file://') ? videoPath : 'file://' + videoPath;


        const formData = new FormData();
        formData.append('video', {
            uri,
            type,
            name,
        });


        const response = await fetch(
            'https://healthai-ezd5c9cgeecudbfn.canadacentral-01.azurewebsites.net/analyze',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',

                },
                body: formData,
            }
        );

        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('API raw response:', responseText);


        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (err) {
            throw new Error('Failed to parse JSON: ' + responseText);
        }
        return data;
    } catch (error) {
        console.error('Video upload error:', error);
        throw error;
    }
};
