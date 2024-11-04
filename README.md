# Custom Hooks

This project is designed to be a centralized and well-organized repository of custom React hooks that can be reused in future projects. This repository not only facilitates code reuse but also promotes consistency and efficiency in React application development.

## **Project Features**

1. **Modular Structure**: Each hook is contained within its own module, with accompanying documentation and usage examples.
2. **Types of Hooks**: The repository includes hooks for managing state, effects, contexts, events, and other common React patterns.
3. **Compatibility**: Hooks are designed to be compatible with the latest versions of React.
4. **Documentation**: Each hook has internal documentation that explains in detail how it works and provides examples for its use as well.
5. **Testing**: Implements unit tests to ensure the functionality and stability of the hooks.
6. **Continuous Updates**: The project is kept up-to-date with new contributions and improvements.

## **Installation**

```bash
npm install @developer-bug/custom-hooks
```

## **Hooks**

### **useDebounce**

Custom hook to debounce a value, delaying updates to the value until after a specified delay has passed since the last change.

**How to use:**

```typescript
import { useDebounce } = from '@developer-bug/custom-hooks';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            // Fetch data only when the debounced search term changes
            fetchData(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
    );
};
```

### **useDocumentTitle**

Custom hook to set the document title in a React component.

**How to use:**

```typescript
import { useDocumentTitle } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    useDocumentTitle("My Page Title");
    return <div>Check the document title!</div>;
};
```

### **useElementDetector**

Custom hook to detect element visibility within the viewport using `IntersectionObserver`.

**How to use**

```typescript
import { useRef } from 'react';
import { useElementDetector } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useElementDetector(
        ref,
        {
            threshold: 0.5, rootMargin: -10
        },
        {
            onTriggerEnter: () => console.log("Entered viewport"),
            onFirstVisible: () => console.log("Visible for the first time"),
            onTriggerExit: () => console.log("Exited viewport"),
            onChangeVisibility: (isVisible) => console.log(`Visibility changed: ${isVisible}`)
        }
    );
    return <div ref={ref}>Check if I am visible</div>;
};
```

### **useFetch**

Custom hook for making HTTP requests using the Fetch API in React. This hook provides methods for all standard HTTP methods and can handle GET, POST, PUT, and DELETE requests.

**How to use:**

- **GET Request**

**All Data**

```typescript
import { useFetch } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const { data, error, loading, get } = useFetch<ResposeType>('https://api.example.com/data');

    useEffect(() => {
        get();
    }, []);

    reutrn(
        <ul>
            {data && data.map((item, index) => (
                <li key="{item.exampleId}">
                    {item.exampleContent}
                </li>
            ))}
        </ul>
    );
}
```

**One Data**

```typescript
import { useFetch } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const { data, error, loading, get } = useFetch<ResposeType>('https://api.example.com/data/1');

    useEffect(() => {
        get();
    }, []);

    reutrn(
        <div>
            <h1>{data.exampleTitle}</h1>
            <p>{data.exampleBody}</p>
        </div>
    );
}
```

- **POST Request**

```typescript
import { useFetch } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const { data, error, loading, post } = useFetch<RequestResposeType, RequestBodyType>('https://api.example.com/data');

    const handleSubmit = async (newData: RequestBodyType) => {
        await post(newData);
    };

    reutrn(
        <button onClick={handleSubmit}>
            New Data
        </button>
    );
}
```

- **PUT Request**

```typescript
import { useFetch } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const { data, error, loading, put } = useFetch<RequestResposeType, RequestBodyType>('https://api.example.com/data/1');

    const handleSubmit = async (updateData: RequestBodyType) => {
        await put(updateData);
    };

    reutrn(
        <button onClick={handleSubmit}>
            Update Data
        </button>
    );
}
```

- **DELETE Request**

```typescript
import { useFetch } = from '@developer-bug/custom-hooks';

const MyComponent = () => {
    const { data, error, loading, delete: deleteRequest } = useFetch<RequestResposeType, RequestBodyType>('https://api.example.com/data/1');

    reutrn(
        <button onClick={deleteRequest}>
            Delete Data
        </button>
    );
}
```

## **Contributing**

If you'd like to contribute to Custom Hooks, here are some guidelines:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Write tests to cover your changes.
5. Run the tests to ensure they pass.
6. Commit your changes.
7. Push your changes to your forked repository.
8. Submit a pull request to dev branch.

## **Authors and Acknowledgment**

Custom Hooks was created by **[JessyAvalosB](https://github.com/JessyAvalosB)**

Additional contributors include:

- **[Chucky22Mendoza](https://github.com/Chucky22Mendoza)**

Thank you to all the contributors for their hard work and dedication to the project.
