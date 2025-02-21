import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res) => res.send({title: 'GET all subscriptions'}));

subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

subscriptionRouter.post('/',authorize, createSubscription);

subscriptionRouter.put('/:id',(req,res) => res.send({title: 'UPDATE subscriptions'}));

subscriptionRouter.delete('/:id',(req,res) => res.send({title: 'DELETE subscriptions'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req,res) => res.send({title: 'GET all subscriptions'}));

subscriptionRouter.get('/upcoming-renewals',(req,res) => res.send({title: 'GET all ssubscriptions'}));


export default subscriptionRouter;