const express = require( 'express' );
const router = express.Router();
const payment = require( '../controllers/payment.controller' )


router.post( "/create-order/:userId", payment.crearOrden )

router.get( "/success", payment.recibirWebhook )
router.get( "/failure", ( req, res ) => res.send( 'pague bien pues mi rey ' ) )
router.get( "/pending", ( req, res ) => res.send( 'esperame tantico ' ) )

router.post( "/webhook", payment.recibirWebhook ) 

module.exports = router;