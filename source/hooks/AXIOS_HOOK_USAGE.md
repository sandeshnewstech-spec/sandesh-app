# useAxiosHook - Usage Guide

This hook provides a simple and structured way to make API calls using Axios in your React Native app.

## Basic Import

```tsx
import { useAxios } from '../hooks';
// OR
import useAxios from '../hooks/useAxiosHook';
```

## Usage in Components

### Example 1: Simple GET Request

```tsx
const MyComponent = () => {
  const { getHomeSecondaryDataAPI } = useAxios();
  
  const fetchData = async () => {
    const response = await getHomeSecondaryDataAPI();
    
    if (!response.err) {
      console.log('Success:', response.res);
    } else {
      console.log('Error:', response.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
};
```

### Example 2: GET Request with Parameters

```tsx
const VideosScreen = () => {
  const { getVideosAPI } = useAxios();
  
  const loadVideos = async (page = 1, limit = 20) => {
    const response = await getVideosAPI(page, limit);
    
    if (!response.err) {
      setVideos(response.res);
    }
  };
};
```

### Example 3: POST Request

```tsx
const PostDetailsScreen = () => {
  const { getPostDetailsAPI } = useAxios();
  
  const fetchPostDetails = async (url: string) => {
    const response = await getPostDetailsAPI(url);
    
    if (response.code === 200) {
      console.log('Post details:', response.res);
    }
  };
};
```

### Example 4: Custom API Request

```tsx
const CustomAPIComponent = () => {
  const { axiosREQ, BASE_URL } = useAxios();
  
  const customAPICall = async () => {
    const response = await axiosREQ({
      method: 'GET',
      apiURI: BASE_URL,
      endPath: 'custom/endpoint',
      params: 'filter=active&sort=desc',
    });
    
    return response;
  };
};
```

### Example 5: POST with Body

```tsx
const FormSubmit = () => {
  const { axiosREQ, FINAL_BASE_URL } = useAxios();
  
  const submitForm = async (formData: any) => {
    const response = await axiosREQ({
      method: 'POST',
      apiURI: FINAL_BASE_URL,
      endPath: 'submit',
      body: formData,
    });
    
    if (!response.err) {
      console.log('Form submitted successfully');
    }
  };
};
```

### Example 6: With Authentication Token

```tsx
const AuthenticatedRequest = () => {
  const { axiosREQ } = useAxios();
  
  const fetchUserData = async (token: string) => {
    const response = await axiosREQ({
      method: 'GET',
      endPath: 'user/profile',
      token: token, // Authorization header
    });
    
    return response;
  };
};
```

### Example 7: Multipart Form Data (File Upload)

```tsx
const ImageUpload = () => {
  const { axiosREQ } = useAxios();
  
  const uploadImage = async (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);
    
    const response = await axiosREQ({
      method: 'POST',
      endPath: 'upload/image',
      body: formData,
      multipart: true,
    });
    
    return response;
  };
};
```

## Response Structure

All API calls return a standardized response:

```typescript
{
  code: number;         // HTTP status code (200, 404, etc.)
  res: any;            // Response data
  url: string;         // Request URL
  status: any;         // Status from API response
  message: string;     // Message from API
  err: boolean;        // Whether there was an error
}
```

## API Cancellation

The hook automatically handles request cancellation:
- ✅ When component unmounts
- ✅ When screen loses focus (using `useIsFocused`)
- ✅ When hardware back button is pressed (Android)

You can also manually cancel:

```tsx
const { abortAPI } = useAxios();

const handleCancel = () => {
  abortAPI(); // Cancels all ongoing requests
};
```

## Available Pre-built API Methods

```typescript
const {
  // Pre-built API calls
  getHomeSecondaryDataAPI,
  getHomeTopMenuAPI,
  getVideosAPI,
  getSettingAPI,
  getPostDetailsAPI,
  getHomePageWebStoryAPI,
  getLatestWebStoriesAPI,
  getCategoryListAPI,
  
  // Custom request method
  axiosREQ,
  
  // Utilities
  abortAPI,
  BASE_URL,
  FINAL_BASE_URL,
  axiosInstance, // For advanced use cases
} = useAxios();
```

## Key Features

✨ **Easy to use** - Simple, consistent API across all endpoints  
🔄 **Auto-cancellation** - Prevents memory leaks and unnecessary requests  
🛡️ **Error handling** - Built-in error handling with toast notifications  
📱 **Platform aware** - Includes platform info in logs and requests  
⚙️ **Flexible** - Supports GET, POST, PUT, DELETE, multipart, urlencoded  
🎯 **TypeScript** - Full type safety with TypeScript support  

## Difference from useAPIsHook (fetch)

| Feature | useAxiosHook | useAPIsHook (fetch) |
|---------|--------------|---------------------|
| Library | Axios | Native fetch |
| Interceptors | ✅ Supported | ❌ Manual |
| Request cancellation | ✅ AbortController | ✅ AbortController |
| Timeout | ✅ Built-in | ❌ Manual |
| Progress tracking | ✅ Available | ❌ Not available |
| Auto JSON parsing | ✅ Automatic | Manual |
| Error handling | ✅ Better | Basic |

## Tips

1. **Reuse the hook** - Call `useAxios()` once at component level
2. **Check errors** - Always check `response.err` before using data
3. **Use type safety** - Define proper types for your API responses
4. **Custom instance** - Use `axiosInstance` for advanced interceptors
