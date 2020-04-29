import Main from './src/Main';

let main: Main = new Main();
main.on('ready', _ => {
    // console.log('ready');
    main.start();
});
