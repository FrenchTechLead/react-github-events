#   Simple Month-Picker For React
This is a basic and light component that shows the recent public activity and events of a given GitHub user

### Presentation
The component's width is responsive, it takes the width of the parent element.
![Image of the component](https://cloud.githubusercontent.com/assets/10856604/26252415/767403e6-3cb0-11e7-822a-53bc68a57af5.png)


### Installation
```shell
npm install react-github-events --save
```
### Example :
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import GitHubEvents from 'react-github-events';

ReactDOM.render(<GitHubEvents
    username="meshredded"
    gitHubToken="TokenString"
    />,
  document.getElementById('root')
);
```

### Props:
|  Prop | is Required ?   | Description   |
|---|---|---|
| String : username    | true   | The GitHub username. |
| String : gitHubToken |  false | This token is not required but the number of requests is limited for unregitred clients, to get a token [click here](https://github.com/settings/tokens)   |

### Issues :
For any suggestion you can [open an issue here](https://github.com/Meshredded/react-github-events/issues).

### Licence :
MIT
