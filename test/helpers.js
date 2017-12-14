const supertest = require('supertest');
const chai = require('chai');
const app = require('../index');

require('events').EventEmitter.defaultMaxListeners = Infinity;

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
