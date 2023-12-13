
# react-native-notification-scroll

## Getting started

`$ npm install react-native-notification-scroll --save`

### Mostly automatic installation

`$ react-native link react-native-notification-scroll`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-notification-scroll` and add `RNNotificationScroll.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNNotificationScroll.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.notification.scroll.RNNotificationScrollPackage;` to the imports at the top of the file
  - Add `new RNNotificationScrollPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-notification-scroll'
  	project(':react-native-notification-scroll').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-notification-scroll/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-notification-scroll')
  	```


## Usage
```javascript
import RNNotificationScroll from 'react-native-notification-scroll';

// TODO: What to do with the module?
RNNotificationScroll;
```
  