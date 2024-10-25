import { Box, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

import Cube from './Cube'
import Cube2 from './Cube2';
import Cube3 from './Cube3';

const BlocksDisplay = () => {
    return(
        <Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' },  width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>01.</span> Cobblestone
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Cube/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Box className="section-content" sx={{ overflow: 'visible', textAlign: 'right', position: 'relative', midWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"},  minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>02.</span> Oak Log
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas>
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Cube3/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
            <Box
                width="100%"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className="section-content" sx={{ overflow: 'visible', pt: 10, position: 'relative', minWidth: { xs: '320px', sm: '600px', md: '800px' }, width: { xs: "100%", sm: "800px", md: "800px"}, minHeight: { xs: '400px', sm: '500px', md: '600px'}, height: { xs: '80vh', sm: '70vh', md: '70vh'} }}>
                    <Typography variant="h6" component="h1" color="#dbdbdb" sx={{ fontWeight: 'bold', fontSize: { xs: '1.4rem', sm: '1.4rem', md: '1.4rem' } }}>
                    <span style={{ color: '#36ffe7', fontSize: '0.8em', fontFamily: 'var(--font-iosevka), monospace', }}>03.</span> Snowy Grass
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    {/* Wrap the Globe in Canvas */}
                        <Canvas >
                        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} castShadow />
                            <Cube2/>
                        </Canvas>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default BlocksDisplay;