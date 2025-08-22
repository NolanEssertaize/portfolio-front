'use client';
import { useMemo } from 'react';
import { useKaizen } from './KaizenContext';
import { PrereqConcept, ProficiencyScale } from './types';
import { buildLessonRequest } from './request';
import { Button } from './ui';

export default function MyDataPanel() {
  const { profile, setProfile, messagesByThread, activeThreadId } = useKaizen();
  const updatePrereq = (i:number,p:Partial<PrereqConcept>)=>{const list=[...profile.priorKnowledge];list[i]={...list[i],...p};setProfile({priorKnowledge:list});};
  const addPrereq=()=>setProfile({priorKnowledge:[...profile.priorKnowledge,{name:'',selfRatedMastery:0}]});
  const removePrereq=(i:number)=>setProfile({priorKnowledge:profile.priorKnowledge.filter((_,j)=>j!==i)});
  const lessonReq=useMemo(()=>buildLessonRequest({profile,chatHistory:activeThreadId?messagesByThread[activeThreadId]||[]:[],sessionId:activeThreadId||crypto.randomUUID()}),[profile,messagesByThread,activeThreadId]);
  const preview=useMemo(()=>JSON.stringify(lessonReq,null,2),[lessonReq]);
  const strategies=[['spacedRepetition','Spaced repetition','Review near the forgetting curve.'],['retrievalPractice','Retrieval practice','Answer from memory first.'],['interleaving','Interleaving','Mix related topics for transfer.'],['workedExamples','Worked examples','Study step-by-step solutions.'],['reflectionPrompts','Reflection prompts','Brief self-explanations.']] as const;
  const formats=['mcq','short-answer','coding','proof'] as const;
  const accessibility=[['dyslexiaFriendly','Dyslexia-friendly'],['highContrast','High contrast'],['captions','Captions']] as const;
  return (
    <div className="space-y-4 text-sm">
      <div className="grid grid-cols-2 gap-2">
        <label><span className="block mb-1">Language</span><select value={profile.language} onChange={e=>setProfile({language:e.target.value as 'en'|'fr'})} className="w-full rounded bg-white/10 p-1"><option value="en">English</option><option value="fr">Français</option></select></label>
        <label><span className="block mb-1">Topic</span><input value={profile.topic} onChange={e=>setProfile({topic:e.target.value})} className="w-full rounded bg-white/10 p-1"/></label>
        <label className="col-span-2"><span className="block mb-1">Precise subject</span><input value={profile.preciseSubject||''} onChange={e=>setProfile({preciseSubject:e.target.value})} className="w-full rounded bg-white/10 p-1"/></label>
        <label className="col-span-2"><span className="block mb-1">Target proficiency: {profile.targetProficiency}</span><input type="range" min={0} max={5} value={profile.targetProficiency} onChange={e=>setProfile({targetProficiency:Number(e.target.value) as ProficiencyScale})} className="w-full"/></label>
        <label><span className="block mb-1">Deadline</span><input type="date" value={profile.deadlineISO||''} onChange={e=>setProfile({deadlineISO:e.target.value})} className="w-full rounded bg-white/10 p-1"/></label>
        <label><span className="block mb-1">Weekly hours</span><input type="number" min={1} max={30} value={profile.weeklyHours} onChange={e=>setProfile({weeklyHours:Number(e.target.value)})} className="w-full rounded bg-white/10 p-1"/></label>
        <label><span className="block mb-1">Session length (min)</span><input type="number" min={15} max={120} step={5} value={profile.sessionLengthMin} onChange={e=>setProfile({sessionLengthMin:Number(e.target.value)})} className="w-full rounded bg-white/10 p-1"/></label>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1"><span>Prerequisites</span><Button type="button" onClick={addPrereq} className="px-2 py-0 text-xs">+ Add</Button></div>
        {profile.priorKnowledge.map((p,i)=>(<div key={i} className="mb-2 flex gap-2 text-xs"><input value={p.name} onChange={e=>updatePrereq(i,{name:e.target.value})} placeholder="Name" className="flex-1 rounded bg-white/10 p-1"/><input type="number" min={0} max={5} value={p.selfRatedMastery} onChange={e=>updatePrereq(i,{selfRatedMastery:Number(e.target.value) as ProficiencyScale})} className="w-14 rounded bg-white/10 p-1"/><input value={p.notes||''} onChange={e=>updatePrereq(i,{notes:e.target.value})} placeholder="Notes" className="flex-1 rounded bg-white/10 p-1"/><Button type="button" onClick={()=>removePrereq(i)} className="px-2 py-0 text-xs bg-red-500/30">×</Button></div>))}
      </div>
      <fieldset className="space-y-1"><legend className="font-medium">Strategies</legend>{strategies.map(([k,l,t])=>(<label key={k} className="flex items-center gap-2" title={t}><input type="checkbox" checked={profile.strategies[k]} onChange={e=>setProfile({strategies:{...profile.strategies,[k]:e.target.checked}})} className="h-4 w-4 rounded"/><span>{l}</span></label>))}</fieldset>
      <fieldset className="space-x-4"><legend className="font-medium mb-1">Difficulty</legend>{(['gentle','balanced','challenging'] as const).map(d=>(<label key={d} className="text-sm"><input type="radio" name="difficulty" value={d} checked={profile.difficultyPreference===d} onChange={e=>setProfile({difficultyPreference:e.target.value as typeof d})} className="mr-1"/>{d}</label>))}</fieldset>
      <fieldset className="space-y-1"><legend className="font-medium">Assessment</legend><div className="flex flex-wrap gap-2">{formats.map(f=>(<label key={f} className="flex items-center gap-1"><input type="checkbox" checked={profile.assessmentPrefs.format.includes(f)} onChange={e=>{const list=profile.assessmentPrefs.format;const next=e.target.checked?[...list,f]:list.filter(x=>x!==f);setProfile({assessmentPrefs:{...profile.assessmentPrefs,format:next}});}}/><span>{f}</span></label>))}</div><label className="block"><span className="mr-2">Micro-quiz every (min)</span><input type="number" min={4} max={15} value={profile.assessmentPrefs.microQuizEveryMin} onChange={e=>setProfile({assessmentPrefs:{...profile.assessmentPrefs,microQuizEveryMin:Number(e.target.value)}})} className="w-20 rounded bg-white/10 p-1"/></label></fieldset>
      <fieldset className="space-y-1"><legend className="font-medium">Accessibility</legend>{accessibility.map(([k,l])=>(<label key={k} className="flex items-center gap-2"><input type="checkbox" checked={profile.accessibility?.[k as keyof typeof profile.accessibility]||false} onChange={e=>setProfile({accessibility:{...profile.accessibility,[k]:e.target.checked}})} className="h-4 w-4 rounded"/><span>{l}</span></label>))}</fieldset>
      <div><label className="block mb-1">Preview JSON</label><textarea readOnly value={preview} className="w-full h-40 rounded bg-black/50 p-2 font-mono text-xs"/><Button type="button" onClick={()=>navigator.clipboard.writeText(preview)} className="mt-1 px-2 py-1 text-xs">Copy JSON</Button></div>
    </div>
  );
}
