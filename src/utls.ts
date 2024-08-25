import { Dimensions } from 'react-native';
export const screenWith = Dimensions.get('window').width;

/**
 * wait a time
 * @param time The number of milliseconds you must wait
 * @returns promise
 */
export const sleep = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * Method for obtaining px to dp conversion
 * @param size size of your UI draft eg: 750
 * @returns px to dp conversion function
 */
export const pxToDp = (elePx: number) => (screenWith * elePx) / 750;
