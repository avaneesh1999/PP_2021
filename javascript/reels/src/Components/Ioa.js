import React,{useEffect,useState} from 'react'
import vid1 from './fashion.mp4';
import vid2 from './frog,mp4';
import vid3 from './water.mp4';
import Video from './Video.mp4';

export default function Ioa() {
    const[sources,setSources] =useState([{url:vid1},{url:vid2},{url:vid3},{url:vid4}])
    const callback =entries=>{
        entries.forEach(element =>{
            console.log(element);
            let el = element.target.childNodes[0];
            el.play().then(()=>{
                //if the video is not in viewreport thgen pause it
                if(!el.paused && !element.isIntersecting){
                    el.pause()
                }
            })
        });
    }

    const observer =new IntersecionObserver(callback,{
        threshold:0.9
    })

    useEffect(() => {
        console.log('Effect');
        let elements= documents.querySelectorAll('.videos')
        elements.forEach(el=>{
            observer.observe(el)
        })
    }, [])
    return (
        <div className="video-container">
            <div className="videos">
                <Video source={sources[0].url}/>
            </div>
            <div className="videos">
                <Video source={sources[1].url}/>
            </div>
            <div className="videos">
                <Video source={sources[2].url}/>
            </div>
            <div className="videos">
                <Video source={sources[3].url}/>
            </div>
        </div>
    )
}
