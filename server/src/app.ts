import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware'
import config from './config/config'
import persons from './controllers/persons';
import positions from './controllers/positions';
import employees from './controllers/employees';
import patients from './controllers/patients';
import appointments from './controllers/appointments';
import users from './controllers/users';
import login from './controllers/login';
import access from './controllers/access';
import health from './controllers/health';
import notifications from './controllers/notifications';
import inventories from './controllers/inventories';
import products from './controllers/products';
import suppliers from './controllers/suppliers';
import services from './controllers/services';
import invoices from './controllers/invoices';
import discounts from './controllers/discounts';
import tools from './controllers/tools';

const app = express()
app.use(express.json())
app.use(express.static('dist'))

if (config.ENV !== "live") {
    app.use(cors())
}

app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)

app.use('/api/persons', persons)
app.use('/api/positions', positions)
app.use('/api/employees', employees)
app.use('/api/patients', patients)
app.use('/api/appointments', appointments)
app.use('/api/users', users)
app.use('/login', login)
app.use('/api/access', access)
app.use('/health', health)
app.use('/api/notifications', notifications)
app.use('/api/inventories', inventories)
app.use('/api/products', products)
app.use('/api/suppliers', suppliers)
app.use('/api/services', services)
app.use('/api/invoices', invoices)
app.use('/api/discounts', discounts)
app.use('/tools', tools)

app.use(middleware.errorHandler)

export default app;