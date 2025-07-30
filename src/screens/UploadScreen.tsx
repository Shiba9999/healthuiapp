// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

// const UploadScreen = () => {
//   const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);


//   const handleFilePick = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//         allowMultiSelection: true,
//       });
  
//       setSelectedFiles(prevFiles => {
//         const allFiles = [...prevFiles, ...res];
//         const unique = allFiles.filter(
//           (file, index, self) =>
//             index === self.findIndex(f => f.name === file.name && f.size === file.size)
//         );
//         return unique;
//       });
//     } catch (err: any) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the picker
//       } else {
//         console.error('File picker error:', err);
//       }
//     }
//   };
  
  

//   const renderItem = ({ item }: { item: DocumentPickerResponse }) => (
//     <View style={styles.fileItem}>
//       <Text style={styles.fileName} numberOfLines={1}>
//         📄 {item.name}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload Documents</Text>

//       <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
//         <Text style={styles.uploadButtonText}>Select Files</Text>
//       </TouchableOpacity>

//       {selectedFiles.length > 0 && (
//         <FlatList
//           data={selectedFiles}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => `${item.name}-${index}`}
//           contentContainerStyle={styles.fileList}
//           showsVerticalScrollIndicator={false}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F8F9FA',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   uploadButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   uploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   fileList: {
//     paddingBottom: 20,
//   },
//   fileItem: {
//     backgroundColor: '#FFFFFF',
//     padding: 14,
//     marginBottom: 10,
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   fileName: {
//     fontSize: 16,
//     color: '#444',
//   },
// });

// export default UploadScreen;



//modern design-2

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

// const { width } = Dimensions.get('window');

// const UploadScreen = () => {
//   const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);

//   const handleFilePick = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//         allowMultiSelection: true,
//       });

//       setSelectedFiles(prevFiles => {
//         const allFiles = [...prevFiles, ...res];
//         const unique = allFiles.filter(
//           (file, index, self) =>
//             index === self.findIndex(f => f.name === file.name && f.size === file.size)
//         );
//         return unique;
//       });
//     } catch (err: any) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the picker
//       } else {
//         console.error('File picker error:', err);
//       }
//     }
//   };

//   const getFileIcon = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return '📄';
//       case 'doc':
//       case 'docx':
//         return '📝';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//       case 'gif':
//         return '🖼️';
//       case 'mp4':
//       case 'avi':
//       case 'mov':
//         return '🎥';
//       case 'mp3':
//       case 'wav':
//         return '🎵';
//       case 'zip':
//       case 'rar':
//         return '📦';
//       default:
//         return '📄';
//     }
//   };

//   const renderItem = ({ item }: { item: DocumentPickerResponse }) => (
//     <View style={styles.fileCard}>
//       <View style={styles.fileIconContainer}>
//         <Text style={styles.fileIcon}>{getFileIcon(item.name)}</Text>
//       </View>
//       <View style={styles.fileInfo}>
//         <Text style={styles.fileName} numberOfLines={1}>
//           {item.name}
//         </Text>
//         {item.size && (
//           <Text style={styles.fileSize}>
//             {(item.size / 1024).toFixed(1)} KB
//           </Text>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Upload Documents</Text>

//         <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
//           <Text style={styles.uploadIcon}>⬆️</Text>
//           <Text style={styles.uploadButtonText}>Select Files</Text>
//         </TouchableOpacity>

//         {selectedFiles.length > 0 ? (
//           <View style={styles.filesSection}>
//             <Text style={styles.sectionTitle}>
//               Selected Files ({selectedFiles.length})
//             </Text>
//             <FlatList
//               data={selectedFiles}
//               renderItem={renderItem}
//               keyExtractor={(item, index) => `${item.name}-${index}`}
//               contentContainerStyle={styles.fileList}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         ) : (
//           <View style={styles.emptyState}>
//             <View style={styles.emptyIconContainer}>
//               <Text style={styles.emptyIcon}>📁</Text>
//             </View>
//             <Text style={styles.emptyText}>No files selected yet</Text>
//             <Text style={styles.emptySubtext}>Tap "Select Files" to get started</Text>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   content: {
//     flex: 1,
//     padding: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 32,
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     backgroundColor: '#3478F6',
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//     shadowColor: '#3478F6',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   uploadIcon: {
//     fontSize: 20,
//     marginRight: 8,
//   },
//   uploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   filesSection: {
//     flex: 1,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 16,
//   },
//   fileList: {
//     paddingBottom: 20,
//   },
//   fileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 18,
//     marginBottom: 12,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: '#F1F5F9',
//   },
//   fileIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F3F4F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   fileIcon: {
//     fontSize: 20,
//   },
//   fileInfo: {
//     flex: 1,
//   },
//   fileName: {
//     fontSize: 16,
//     color: '#374151',
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   fileSize: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   emptyIconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#F3F4F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   emptyIcon: {
//     fontSize: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#6B7280',
//     fontWeight: '600',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     textAlign: 'center',
//   },
// });

// export default UploadScreen;


//modern design - 3
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

// const UploadScreen = () => {
//   const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);

//   const handleFilePick = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//         allowMultiSelection: true,
//       });

//       setSelectedFiles(prevFiles => {
//         const allFiles = [...prevFiles, ...res];
//         const unique = allFiles.filter(
//           (file, index, self) =>
//             index === self.findIndex(f => f.name === file.name && f.size === file.size)
//         );
//         return unique;
//       });
//     } catch (err: any) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the picker
//       } else {
//         console.error('File picker error:', err);
//       }
//     }
//   };

//   const removeFile = (fileName: string, fileSize?: number) => {
//     Alert.alert(
//       'Remove File',
//       'Remove this file?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => {
//             setSelectedFiles(prev => 
//               prev.filter(file => !(file.name === fileName && file.size === fileSize))
//             );
//           },
//         },
//       ]
//     );
//   };

//   const getFileIcon = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return '📄';
//       case 'doc':
//       case 'docx':
//         return '📝';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//       case 'gif':
//         return '🖼️';
//       case 'mp4':
//       case 'avi':
//       case 'mov':
//         return '🎥';
//       case 'mp3':
//       case 'wav':
//         return '🎵';
//       case 'zip':
//       case 'rar':
//         return '📦';
//       default:
//         return '📄';
//     }
//   };

//   const getFileType = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
//     if (extension === 'pdf') return 'pdf';
//     if (['doc', 'docx'].includes(extension || '')) return 'document';
//     if (['mp4', 'avi', 'mov'].includes(extension || '')) return 'video';
//     if (['mp3', 'wav'].includes(extension || '')) return 'audio';
//     return extension || 'file';
//   };

//   const formatFileSize = (bytes?: number) => {
//     if (!bytes || bytes === 0) return 'Unknown size';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>File Upload</Text>
//         <Text style={styles.headerSubtitle}>Select files from your device</Text>
//       </View>

//       {/* Upload Button */}
//       <View style={styles.uploadSection}>
//         <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
//           <View style={styles.uploadIconContainer}>
//             <Text style={styles.uploadIcon}>📁</Text>
//           </View>
//           <Text style={styles.uploadButtonText}>Select Files</Text>
//           <Text style={styles.uploadButtonSubtext}>Choose any type of files</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.filesSection}>
//         <Text style={styles.filesSectionTitle}>
//           Selected Files ({selectedFiles.length})
//         </Text>

//         <ScrollView style={styles.filesContainer} showsVerticalScrollIndicator={false}>
//           {selectedFiles.length === 0 ? (
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyIcon}>📂</Text>
//               <Text style={styles.emptyTitle}>No files selected</Text>
//               <Text style={styles.emptyText}>Tap select button to choose files</Text>
//             </View>
//           ) : (
//             selectedFiles.map((file, index) => (
//               <View key={`${file.name}-${index}`} style={styles.fileCard}>
//                 <View style={styles.fileContent}>
//                   <View style={styles.fileIconWrapper}>
//                     <Text style={styles.fileIcon}>{getFileIcon(file.name)}</Text>
//                   </View>
                  
//                   <View style={styles.fileInfo}>
//                     <Text style={styles.fileName} numberOfLines={2}>
//                       {file.name}
//                     </Text>
//                     <Text style={styles.fileDetails}>
//                       {formatFileSize(file.size)} • {new Date().toLocaleString()}
//                     </Text>
//                     <View style={styles.fileTypeTag}>
//                       <Text style={styles.fileTypeText}>
//                         {getFileType(file.name).toUpperCase()}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
                
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removeFile(file.name, file.size)}
//                 >
//                   <Text style={styles.removeText}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           )}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UploadScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   header: {
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1A202C',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#64748B',
//   },
//   uploadSection: {
//     padding: 20,
//   },
//   uploadButton: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingVertical: 30,
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#E2E8F0',
//     borderStyle: 'dashed',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   uploadIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   uploadIcon: {
//     fontSize: 20,
//   },
//   uploadButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A202C',
//     marginBottom: 4,
//   },
//   uploadButtonSubtext: {
//     fontSize: 14,
//     color: '#64748B',
//   },
//   filesSection: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   filesSectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A202C',
//     marginBottom: 16,
//   },
//   filesContainer: {
//     flex: 1,
//   },
//   emptyState: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   emptyIcon: {
//     fontSize: 40,
//     marginBottom: 12,
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   fileCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     alignItems: 'center',
//   },
//   fileContent: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   fileIconWrapper: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   fileIcon: {
//     fontSize: 18,
//   },
//   fileInfo: {
//     flex: 1,
//   },
//   fileName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A202C',
//     marginBottom: 4,
//   },
//   fileDetails: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 6,
//   },
//   fileTypeTag: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#EFF6FF',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   fileTypeText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#3B82F6',
//   },
//   removeButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#FEF2F2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 12,
//   },
//   removeText: {
//     fontSize: 16,
//     color: '#EF4444',
//     fontWeight: '600',
//   },
// });

//issue fix of3 - 4
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  pick,
  isErrorWithCode,
  errorCodes,
  type DocumentPickerResponse,
} from '@react-native-documents/picker';

const UploadScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>([]);

  const handleFilePick = async () => {
    try {
      const res = await pick({
        allowMultiSelection: true,
        presentationStyle: 'import',
        copyTo: 'cachesDirectory',
      });

      setSelectedFiles(prevFiles => {
        const allFiles = [...prevFiles, ...res];
        const unique = allFiles.filter(
          (file, index, self) =>
            index === self.findIndex(f => f.name === file.name && f.size === file.size)
        );
        return unique;
      });
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled
      } else {
        console.error('File picker error:', err);
      }
    }
  };

  const removeFile = (fileName: string, fileSize?: number) => {
    Alert.alert('Remove File', 'Remove this file?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setSelectedFiles(prev =>
            prev.filter(file => !(file.name === fileName && file.size === fileSize))
          );
        },
      },
    ]);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥';
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📄';
    }
  };

  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
    if (extension === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(extension || '')) return 'document';
    if (['mp4', 'avi', 'mov'].includes(extension || '')) return 'video';
    if (['mp3', 'wav'].includes(extension || '')) return 'audio';
    return extension || 'file';
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>File Upload</Text>
        <Text style={styles.headerSubtitle}>Select files from your device</Text>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleFilePick}>
          <View style={styles.uploadIconContainer}>
            <Text style={styles.uploadIcon}>📁</Text>
          </View>
          <Text style={styles.uploadButtonText}>Select Files</Text>
          <Text style={styles.uploadButtonSubtext}>Choose any type of files</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filesSection}>
        <Text style={styles.filesSectionTitle}>
          Selected Files ({selectedFiles.length})
        </Text>

        <ScrollView style={styles.filesContainer} showsVerticalScrollIndicator={false}>
          {selectedFiles.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyTitle}>No files selected</Text>
              <Text style={styles.emptyText}>Tap select button to choose files</Text>
            </View>
          ) : (
            selectedFiles.map((file, index) => (
              <View key={`${file.name}-${index}`} style={styles.fileCard}>
                <View style={styles.fileContent}>
                  <View style={styles.fileIconWrapper}>
                    <Text style={styles.fileIcon}>{getFileIcon(file.name)}</Text>
                  </View>

                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={2}>
                      {file.name}
                    </Text>
                    <Text style={styles.fileDetails}>
                      {formatFileSize(file.size)} • {new Date().toLocaleString()}
                    </Text>
                    <View style={styles.fileTypeTag}>
                      <Text style={styles.fileTypeText}>
                        {getFileType(file.name).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFile(file.name, file.size)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginBottom: 4 },
  headerSubtitle: { fontSize: 16, color: '#64748B' },
  uploadSection: { padding: 20 },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadIcon: { fontSize: 20 },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  uploadButtonSubtext: { fontSize: 14, color: '#64748B' },
  filesSection: { flex: 1, paddingHorizontal: 20 },
  filesSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 16,
  },
  filesContainer: { flex: 1 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyText: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  fileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignItems: 'center',
  },
  fileContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  fileIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileIcon: { fontSize: 18 },
  fileInfo: { flex: 1 },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 4,
  },
  fileDetails: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  fileTypeTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fileTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#3B82F6',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  removeText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
});
