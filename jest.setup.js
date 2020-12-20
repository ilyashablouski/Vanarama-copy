/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import 'core-js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
