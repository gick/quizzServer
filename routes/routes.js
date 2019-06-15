module.exports = function (app) {
    let Session=require('../model/session')
    let Score=require('../model/score')

    app.post('/api/start',function(req,res){
        Session.findOne({sessionId:req.sessionID})
        .exec(function(err,result){
            if(!result){
                let s=new Session()
                s.sessionId=req.sessionID
                s.run.push(new Date())
                s.save()
                res.send({success:true})
                return
            }
            result.run.push(new Date())
            result.question.push({})
            result.save()
            res.send({success:true})
        })
    })
    app.post('/api/score',function(req,res){
        let s=new Score();
        s.name=req.body.name
        s.score=req.body.score
        s.date=new Date()
        s.save()
        res.send({success:true})
    })
    app.get('/api/score',function(req,res){
        Score.find()
        .exec(function(err,result){
            res.send(result)
        })
    })

    app.post('/api/question',function(req,res){
        Session.findOne({sessionId:req.sessionID})
        .exec(function(err,result){
            if(!result){
                let s=new Session()
                s.sessionId=req.sessionID
                s.run.push(new Date())
                s.question.push(req.body.question)
                s.save()
                res.send({success:true})
                return
            }
            let q=req.body.question
            q.date=new Date()
            result.question.push(q)
            result.save()
            res.send({success:true})
        })
    })


}