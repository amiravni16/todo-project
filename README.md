# React Todo App with Redux

A modern, feature-rich todo application built with React, Redux, and modern web technologies. This application demonstrates advanced state management, user authentication, and responsive design patterns.

## 🚀 Features

### Core Functionality
- **Todo Management**: Create, read, update, and delete todos
- **User Authentication**: Secure login/signup system with session management
- **Real-time Updates**: Instant UI updates with Redux state management
- **Responsive Design**: Modern, clean interface that works on all devices

### Advanced Features
- **Color Customization**: Personalize app appearance with custom text and background colors
- **User Balance System**: Earn points (balance) for completing tasks
- **Activity Tracking**: Monitor user actions with timestamped activity logs
- **Progress Tracking**: Visual progress bars showing completion percentage
- **Smart Filtering**: Filter todos by text, importance, and completion status
- **Debounced Search**: Optimized text filtering with debouncing
- **Sorting & Pagination**: Advanced data management with sorting and pagination

### User Experience
- **Loading States**: Visual feedback during data operations
- **Success/Error Messages**: Clear communication of operation results
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Live Previews**: See color changes in real-time before saving

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 with JSX
- **State Management**: Redux with custom thunk middleware
- **Routing**: React Router with HashRouter
- **Styling**: CSS with CSS Variables for theming
- **Build Tool**: Babel for in-browser transpilation

### Project Structure
```
todo-project/
├── assets/
│   └── style/           # CSS files organized by component/page
├── cmps/                # Reusable UI components
├── pages/               # Route-level page components
├── services/            # Business logic and API services
├── store/               # Redux store configuration
│   ├── actions/         # Redux action creators
│   ├── todoStore.js     # Todo state management
│   └── userStore.js     # User state management
├── lib/                 # External libraries
└── index.html           # Main HTML entry point
```

### State Management
- **Modular Redux Store**: Separated into `todoStore` and `userStore`
- **Async Actions**: Redux Thunk for handling asynchronous operations
- **Immutable Updates**: Pure reducer functions for predictable state changes
- **Centralized State**: Single source of truth for application data

## 📱 Components

### Smart Components (Dispatch to Store)
- `TodoApp`: Main todo management interface
- `TodoEdit`: Todo creation and editing
- `TodoDetails`: Detailed todo view
- `UserDetails`: User profile and preferences
- `Dashboard`: Statistics and overview

### Dumb Components (Receive Props)
- `TodoList`: Display list of todos
- `TodoFilter`: Filtering and search controls
- `TodoPreview`: Individual todo display
- `ActivityList`: User activity timeline
- `AppHeader`: Navigation and user info
- `AppFooter`: Progress and additional info

## 🔐 Authentication & User Management

### User Model
```javascript
{
  _id: "uniqueId",
  username: "user123",
  password: "hashedPassword",
  fullname: "John Doe",
  balance: 10000,
  activities: [
    { txt: "Added a Todo", at: 1523873242735 }
  ],
  preferences: {
    color: "#ffffff",
    bgColor: "#000000"
  },
  createdAt: 1711490430252,
  updatedAt: 1711490430999
}
```

### Security Features
- **Session Management**: Persistent login state
- **Password Hashing**: Secure credential storage
- **Route Protection**: Authenticated user access control

## 🎨 Theming System

### CSS Variables
- **`--clr1`**: Primary background color
- **`--clr2`**: Primary text color
- **Dynamic Updates**: Real-time color changes
- **User Persistence**: Saved preferences across sessions

### Color Application
- **Immediate Effect**: Colors apply instantly after login
- **Global Scope**: Theme affects entire application
- **Fallback Values**: Default colors when preferences aren't set

## 📊 Data Management

### Todo Model
```javascript
{
  _id: "gZ6Nvy",
  txt: "Master Redux",
  importance: 9,
  isDone: false,
  color: "#FF6B6B",
  createdAt: 1711472269690,
  updatedAt: 1711472269690
}
```

### Services
- **`todoService`**: CRUD operations for todos
- **`userService`**: User authentication and management
- **`storageService`**: Local storage operations
- **`utilService`**: Utility functions and helpers
- **`eventBusService`**: Application-wide messaging

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Live Server or similar development server

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Start a local development server
4. Open the application in your browser

### Development
- **Hot Reload**: Changes reflect immediately in the browser
- **Babel Transpilation**: Modern JavaScript features supported
- **ES6 Modules**: Clean import/export syntax

## 🔧 Configuration

### Environment Setup
- **Babel Preset**: Custom preset for React and modern JS
- **CSS Organization**: Modular styling with component-specific files
- **Library Loading**: Optimized script loading order

### Customization
- **Color Themes**: Modify CSS variables for different themes
- **Component Styling**: Update component-specific CSS files
- **State Structure**: Modify Redux store configuration

## 📈 Performance Features

### Optimization
- **Debounced Search**: Reduced API calls during typing
- **Efficient Rendering**: React optimization with proper key props
- **Lazy Loading**: Components load only when needed
- **State Normalization**: Optimized Redux state structure

### User Experience
- **Loading Indicators**: Visual feedback during operations
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and ARIA support

## 🤝 Contributing

### Code Style
- **ES6+ Syntax**: Modern JavaScript features
- **Component Architecture**: Clear separation of concerns
- **Redux Patterns**: Standard Redux implementation
- **CSS Organization**: Modular and maintainable styles

### Best Practices
- **Immutable Updates**: Pure functions for state changes
- **Error Handling**: Comprehensive error management
- **Type Safety**: Proper prop validation
- **Documentation**: Clear code comments and structure

## 📄 License

This project is part of a coding academy curriculum and demonstrates modern web development practices with React and Redux.

## 🎯 Future Enhancements

- **Real-time Collaboration**: Multi-user todo sharing
- **Advanced Analytics**: Detailed progress tracking
- **Mobile App**: Native mobile application
- **API Integration**: Backend service integration
- **Testing**: Comprehensive test coverage

---

**Built with ❤️ using React, Redux, and modern web technologies**
