import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

import Globe from './Globe'
import Saturn from './Saturn';
import Sun from './Sun';
import Mercury from './Mercury';
import Venus from './Venus';
import Jupiter from './Jupiter';
import Uranus from './Uranus';
import Neptune from './Neptune';
import Mars from './Mars';


const PlanetsDisplay = () => {
    return(
        <Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="three-content-left">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>01.</span> Earth & Moon
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Globe/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Box className="three-content-right">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>02.</span> The Sun
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Sun/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="three-content-left">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Saturn & Rings
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Saturn/>
                        </Canvas>
                    </Box>
                </Box>
                </Box>
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                <Box className="three-content-right">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>04.</span> Mercury
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Mercury/>
                        </Canvas>
                    </Box>
                </Box>
                </Box>
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                <Box className="three-content-left">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>05.</span> Venus
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Venus/>
                        </Canvas>
                    </Box>
                </Box>
                </Box>
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                <Box className="three-content-right">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>06.</span> Jupiter
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Jupiter/>
                        </Canvas>
                    </Box>
                </Box>
                </Box>
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                <Box className="three-content-left">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>07.</span> Uranus
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Uranus/>
                        </Canvas>
                    </Box>
                </Box>
                </Box>
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                <Box className="three-content-right">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>08.</span> Neptune
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Neptune/>
                        </Canvas>
                    </Box>
                </Box>
                </Box> 
                <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                <Box className="three-content-left">
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>09.</span> Mars
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Mars/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PlanetsDisplay;