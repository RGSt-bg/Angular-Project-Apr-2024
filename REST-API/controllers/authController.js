const router = require('express').Router();

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtil');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

// Post register for back-end
// router.post('/register', isGuest, async (req, res) => {
//     const userData = req.body;
//     console.log('authController -> register: ', userData);

//     try {
//     const token = await authService.register(userData);

//     res.cookie('auth', token);
//     res.redirect('/');
//     }
//     catch(err) {
//         res.render('auth/register', { ...userData, error: getErrorMessage(err) });
//     }
// });

// Post register for front-end
router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
    const token = await authService.register(userData);

    res.cookie('auth', token);
    const response = {
        success: true,
        message: 'Registration successfully!',
        token: token,
      };
    
      res.send(JSON.stringify(response));
    }
    catch (err){
        res.send(JSON.stringify({message: getErrorMessage(err)}));
    }
});

// Get login for back-end
// router.get('/login', isGuest, (req, res) => {
//     res.render('auth/login');
// });

// Get login for front-end
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Post login for back-end
// router.post('/login', isGuest, async (req, res) => {
//     const loginData = req.body;

//     try {
//         const token = await authService.login(loginData);

//         res.cookie('auth', token);
//         res.redirect('/');
//     }
//     catch (err){
//         res.render('auth/login', { ...loginData, error: getErrorMessage(err) });
//     }
// });

// Post login for front-end
router.post('/login', async (req, res) => {
    const loginData = req.body;
    try {
        const token = await authService.login(loginData);

        res.cookie('auth', token);
        const response = {
            success: true,
            message: 'Logged in successfully!',
            token: token,
          };
        
          res.cookie('auth', token);
          res.send(JSON.stringify(response));
    }
    catch (err){
        res.send(JSON.stringify({message: getErrorMessage(err)}));
    }
});

// Get logout for back-end
// router.get('/logout', isAuth, (req, res) => {
//     res.clearCookie('auth');
//     res.redirect('/');
// });

// Post logout for front-end
router.post('/logout', (req, res) => {

    try {
        res.clearCookie('auth');

        const response = {
            success: true,
            message: 'Logged off successfully!',
          };
        
        res.send(JSON.stringify(response));
    }
    catch (err){
        res.send(JSON.stringify({message: getErrorMessage(err)}));
    }
});

module.exports = router;