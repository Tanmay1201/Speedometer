import { useEffect, useRef  } from 'react'
import './Speedometer.css'

const Speedometer = () => {
    const canvasRef = useRef(null)
    const temp1 = 0.42
    var temp2 = 0.15
    var canvas
    var digitalSpeed = '215'
    const getspeed = () => {
        canvas = canvasRef.current
        if (canvas != null && canvas.getContext) {
            setInterval(speedmeter, 100);
        }
        else
        {
            alert("Canvas not supported by your browser!");
        }
    }
    function speedmeter() {
        console.log('Speed')
        if (digitalSpeed < 0)
        {
            digitalSpeed = 230      
        }
        if (temp2 < -3.5)
        {
            temp2 = 0.45    
        }
        temp2 -= 0.01
        digitalSpeed -= 0.6
        digitalSpeed = digitalSpeed.toString().substr(0,5)
        console.log(temp2)
        var options = buildOptionsAsJSON(canvas);
        options.ctx.clearRect(0, 0, 600, 600)
        drawOuterMetallicArc(options);
        drawBackground(options);
        drawInnerBackground(options);
        drawTicks(options);
        drawTextMarkers(options);
        drawInnerMetallicArc(options)
        showMeterValue(options)
        showRange(options)
    }

    function drawOuterMetallicArc(options)
    {
        options.ctx.beginPath();
        options.ctx.globalAlpha = 0.8;
        var gradient = options.ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "#ffa31a");

        // Fill with gradient
        options.ctx.strokeStyle = gradient;
        console.log('temp1 ' + temp1)
        console.log('temp2 '+ temp2)
        options.ctx.arc
        (
            options.center.X,
            options.center.Y,
            options.radius - 10,
            Math.PI - temp1,
            2 * Math.PI + temp2,
        );
        //options.ctx.fill();
        options.ctx.lineWidth = 10;
        options.ctx.stroke();
    }
 
    function drawInnerMetallicArc(options)
    {
        options.ctx.beginPath();
        options.ctx.fillStyle = "rgb(0,0,0)";
    
        // Outer circle (subtle edge in white->grey)
        options.ctx.arc(options.center.X,
                        options.center.Y,
                        100,
                        
                        Math.PI + 0.3,
        1.9 * Math.PI);
    
        options.ctx.stroke();
    }
    
    function drawBackground(options)
    {
        options.ctx.globalAlpha = 0.5;
        options.ctx.fillStyle = "rgb(0,0,0)";
    
        // Draw semi-transparent circles
        for (var i = 180; i < 200 ; i++)
        {
            options.ctx.beginPath();
    
            options.ctx.arc(options.center.X,
                options.center.Y,
                1 * i,
                Math.PI-0.5,
                 2 * Math.PI+0.5);
    
            options.ctx.fill();
            
        }
    }

    function drawInnerBackground(options)
    {
        options.ctx.globalAlpha = 0.8;
        options.ctx.globalAlpha = 0.5;
        options.ctx.fillStyle = "#141414";
    
        for (var i = 140; i < 160 ; i++)
        {
            options.ctx.beginPath();
    
            options.ctx.arc(options.center.X,
                options.center.Y,
                1 * i,
                Math.PI+0.5,
                 2 * Math.PI-0.5);
    
            options.ctx.fill();
        }        
    }
    function drawTicks(options)
    {
        drawSmallTickMarks(options);
        drawLargeTickMarks(options);
    }
    
    function drawSmallTickMarks(options)
    {
        var tickvalue = options.levelRadius;
        var iTick = 0;
        var gaugeOptions = options.gaugeOptions;
        var iTickRad = 0;
    
        var innerTickY;
        var innerTickX;
        var onArchX;
        var onArchY;
    
        var fromX;
        var fromY;
    
        var toX;
        var toY;
        var line;
    
        applyDefaultContextSettings(options);
    
        tickvalue = options.levelRadius - 0.1;
    
        // 10 units (major ticks)
        for (iTick = -20; iTick < 200; iTick += 2)
        {
            iTickRad = degToRad(iTick);
    
            onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
            onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
            innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
            innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);
    
            fromX = (options.center.X - gaugeOptions.radius) + onArchX;
            fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
    
            toX = (options.center.X - gaugeOptions.radius) + innerTickX;
            toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;
    
            // Create a line expressed in JSON
            line = createLine(fromX, fromY, toX, toY, "rgb(255,230,128)", 1, 0.6);
    
            // Draw the line
            drawLine(options, line);
        }
        
    }

    function showMeterValue(options)
    {
        options.ctx.globalAlpha = 0.8;
        options.ctx.font = "40px serif"; 
        options.ctx.fillStyle = "#ffffff"; 
        console.log('Speeed' + digitalSpeed)
        options.ctx.fillText(digitalSpeed, 280, 250)
    }

    function showRange(options)
    {
        options.ctx.globalAlpha = 0.8;
        options.ctx.font = "10px serif"; 
        options.ctx.fillStyle = "#ff9900"; 
 
        let string = "Km/h"
        options.ctx.fillText(string, 375, 275)
    }

    function drawLargeTickMarks(options)
    {
        var tickvalue = options.levelRadius ;
        var iTick = 0;
        var gaugeOptions = options.gaugeOptions;
        var iTickRad = 0;
    
        applyDefaultContextSettings(options);
    
        // Tick every 20 degrees (small ticks)
        for (iTick = -20; iTick < 220; iTick += 20)
        {
            iTickRad = degToRad(iTick);
    
            var onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
            var onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
            var innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
            var innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);
    
            var fromX = (options.center.X - gaugeOptions.radius) + onArchX;
            var fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
    
            var toX = (options.center.X - gaugeOptions.radius) + innerTickX;
            var toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;
    
            // Create a line expressed in JSON
            var line = createLine(fromX, fromY, toX, toY, "rgb(255,255,179)", 3, 1);
    
            // Draw the line
            drawLine(options, line);
    
        }
    }

    function drawTextMarkers(options) {
        var innerTickX = 0,
            innerTickY = 0,
            iTick = 0,
            gaugeOptions = options.gaugeOptions,
            iTickToPrint = 0;

        applyDefaultContextSettings(options);

        // Font styling
        options.ctx.font = 'italic 10px sans-serif';
        options.ctx.textBaseline = 'top';

        options.ctx.beginPath();

        // Tick every 20 (small ticks)
        for (iTick = -20; iTick < 220; iTick += 20) {

            innerTickX = gaugeOptions.radius - (Math.cos(degToRad(iTick)) * gaugeOptions.radius);
            innerTickY = gaugeOptions.radius - (Math.sin(degToRad(iTick)) * gaugeOptions.radius);

            // Some cludging to center the values (TODO: Improve)
            if (iTick <= 10) {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
            } else if (iTick < 50) {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX - 5,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
            } else if (iTick < 90) {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
            } else if (iTick === 90) {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 4,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
            } else if (iTick < 145) {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 10,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY);
            } else {
                options.ctx.fillText(iTickToPrint, (options.center.X - gaugeOptions.radius - 12) + innerTickX + 15,
                        (gaugeOptions.center.Y - gaugeOptions.radius - 12) + innerTickY + 5);
            }

            // MPH increase by 10 every 20 degrees
            iTickToPrint += Math.round(200 / 10);
        }
        options.ctx.stroke();
    }

    function createLine(fromX, fromY, toX, toY, fillStyle, lineWidth, alpha) {
        // Create a line object using Javascript object notation
        return {
            from: {
                X: fromX,
                Y: fromY
            },
            to:	{
                X: toX,
                Y: toY
            },
            fillStyle: fillStyle,
            lineWidth: lineWidth,
            alpha: alpha
        };
    }

    function drawLine(options, line) {
        // Draw a line using the line object passed in
        options.ctx.beginPath();

        // Set attributes of open
        options.ctx.globalAlpha = line.alpha;
        options.ctx.lineWidth = line.lineWidth;
        options.ctx.fillStyle = line.fillStyle;
        options.ctx.strokeStyle = line.fillStyle;
        options.ctx.moveTo(line.from.X,
            line.from.Y);

        // Plot the line
        options.ctx.lineTo(
            line.to.X,
            line.to.Y
        );

        options.ctx.stroke();
    }

    
    function degToRad(angle) {
	// Degrees to radians
	    return ((angle * Math.PI) / 180);
    }
    

    function applyDefaultContextSettings(options) {
        options.ctx.lineWidth = 2;
        options.ctx.globalAlpha = 0.5;
        options.ctx.strokeStyle = "rgb(255, 255, 255)";
        options.ctx.fillStyle = 'rgb(255,255,255)';
    }
    
    const buildOptionsAsJSON = (canvas) => {

        var centerX = 330,
            centerY = 330,
            radius = 170,
            outerRadius = 210;
                
        return {
            ctx: canvas.getContext('2d'),
            center:	{
                X: centerX,
                Y: centerY
            },
            levelRadius: radius - 8,
            gaugeOptions: {
                center:	{
                    X: centerX,
                    Y: centerY
                },
                radius: radius
            },
            radius: outerRadius
        };
    }
    
    useEffect(() => {
            getspeed()
    })
    
    return (
        <div className='Parent'>
            <canvas ref={canvasRef} width={600} height={600} />
        </div>
    )
}

export default Speedometer