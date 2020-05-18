import React, { useState } from 'react'
import DynamicText from '../../utils/DynamicText'

const twitterImg = require('./twitter-logo.svg');
const blogImg = require('./blogpost.svg');
const longBlogImg = require('./longread.svg');
const bookImg = require('./book.svg');

type Range = 'WEEK' | 'MONTH' | 'YEAR' | '5_YEARS' | '10_YEARS';
type MediumKey = 'TWEETS' | 'BLOGS' | 'LONG_BLOGS' | 'BOOKS'

const CHAR_PER_WORD = 5.1
const TWEET_WORDS = 140 / CHAR_PER_WORD
const SHORT_BLOG_WORDS = 1120
const LONG_BLOG_WORDS = 10000
const BOOK_WORD_COUNT = 90000


function Reading() {
    const [wordsPerMinute, setWordsPerMinute] = useState(200)
    const [minutesPerDay, setMinutesPerDay] = useState(30)
    const [curRange, setRange] = useState<Range>('MONTH')

    const groups = [10000, 1000, 100, 10, 1]
    const totalWords = getTotalWords()
    const maxTweets = totalWords / TWEET_WORDS
    const maxBlogs = totalWords / SHORT_BLOG_WORDS
    const maxLongBlogs = totalWords / LONG_BLOG_WORDS
    const maxBooks = totalWords / BOOK_WORD_COUNT

    function getDefaultMap() {
        const defaultMap = new Map<MediumKey, number>();
        defaultMap.set('TWEETS', 10)
        defaultMap.set('BLOGS', 20)
        defaultMap.set('LONG_BLOGS', 20)
        defaultMap.set('BOOKS', 50)
        return defaultMap
    }

    // Percentages
    const [percentages, setPercentages] = useState(getDefaultMap)

    function getRangeTitle(range: Range) {
        switch (range) {
            case 'WEEK':
                return '1 week';
            case 'MONTH':
                return '1 month';
            case 'YEAR':
                return '1 year';
            case '5_YEARS':
                return '5 years';
            case '10_YEARS':
                return '10 years';
            default:
                throw Error('No range');
        }
    }

    function getTotalWords(): number {
        switch (curRange) {
            case 'WEEK':
                return wordsPerMinute * minutesPerDay * 7
            case 'MONTH':
                return wordsPerMinute * minutesPerDay * 30
            case 'YEAR':
                return wordsPerMinute * minutesPerDay * 365
            case '5_YEARS':
                return wordsPerMinute * minutesPerDay * 365 * 5
            case '10_YEARS':
                return wordsPerMinute * minutesPerDay * 365 * 10
            default:
                throw Error('No range');
        }
    }

    function rebalancePercents(updateKey: MediumKey, updateVal: number) {
        const prevValue = percentages.get(updateKey);
        const prevRemainder = 100 - prevValue;
        const remainder = 100 - updateVal;
        const newPercentages = new Map<MediumKey, number>();

        percentages.forEach((value, key) => {
            if (key === updateKey){
                newPercentages.set(key, updateVal);
            } else {
                const curPercent = remainder * percentages.get(key) / prevRemainder || 0
                newPercentages.set(key, curPercent)
            }
        })

        setPercentages(newPercentages)
    }

    function renderSelect() {
        const ranges: Range[] = ['WEEK', 'MONTH', 'YEAR', '5_YEARS', '10_YEARS']

        return (
            <div className="select in-text">
                <select value={curRange} onChange={(e) => { setRange(e.target.value as Range) }}>
                {ranges.map((range) =>
                    <option key={range} value={range}>{getRangeTitle(range)}</option>
                )}
                </select>
            </div>
        );
    }

    function getUnitRecords(n : number) {
        const units: Record<number, number> = {}
        for (let group of groups) {
            const quotient = Math.floor(n / group);
            n = n % group;
            units[group] = quotient
        }

        return units;
    }

    function getRenderedUnits(key: MediumKey, max: number, image) {
        const size = 30;
        const num = percentages.get(key) / 100 * max
        const unitRecords = getUnitRecords(num);
        const unitsToRender = []

        for (let group in unitRecords) {
            const groupCount = unitRecords[group]
            const multiplier = Math.pow(1.5, Math.log10(parseInt(group)))
            for (let i = 0; i < groupCount; i++) {
                unitsToRender.push(
                    <div className="has-text-centered has-text-grey is-inline-block">
                        <img key={`${group}-${i}`} style={{display: "block"}}
                             src={image} width={multiplier * size}></img>
                        <span>{group}</span>
                    </div>
                )
            }
        }

        return unitsToRender
    }

    function renderPictoralView() {
        const twitterUnits = getRenderedUnits('TWEETS', maxTweets, twitterImg)
        const blogUnits = getRenderedUnits('BLOGS', maxBlogs, blogImg)
        const longBlogUnits = getRenderedUnits('LONG_BLOGS', maxLongBlogs, longBlogImg)
        const bookUnits = getRenderedUnits('BOOKS', maxBooks, bookImg)

        return (
            <>
                <h3>Or in pictures..</h3>

                <div style={{paddingBottom: '0.5em'}}>
                    <div className="has-text-grey is-inline-block">
                        <img style={{display: "block", marginLeft:'auto', marginRight:'auto'}} src={twitterImg} width={30}></img>
                        <span>tweets</span>
                    </div>
                    <div className="has-text-grey is-inline-block" style={{paddingLeft: '0.8em'}}>
                        <img style={{display: "block", marginLeft:'auto', marginRight:'auto'}} src={blogImg} width={30}></img>
                        <span>blogs</span>
                    </div>
                    <div className="has-text-grey is-inline-block" style={{paddingLeft: '0.8em'}}>
                        <img style={{display: "block", marginLeft:'auto', marginRight:'auto'}} src={longBlogImg} width={30}></img>
                        <span>long blogs</span>
                    </div>
                    <div className="has-text-grey is-inline-block" style={{paddingLeft: '0.8em'}}>
                        <img style={{display: "block", marginLeft:'auto', marginRight:'auto'}} src={bookImg} width={30}></img>
                        <span>books</span>
                    </div>
                </div>

                {twitterUnits}{blogUnits}{longBlogUnits}{bookUnits}
            </>
        )
    }

    return (
        <div className="content">
            <div>
                If you read <DynamicText value={wordsPerMinute} max={1000} onInput={v => setWordsPerMinute(v)}/> words per minute
                and read for <DynamicText value={minutesPerDay} max={60 * 8} onInput={v => setMinutesPerDay(v)}/> minutes per day,
                then in {renderSelect()} you can read all of:
            </div>

            <ul>
                <li>
                    <DynamicText
                        value={percentages.get('TWEETS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxTweets).toFixed(0)}
                        onInput={(v) => rebalancePercents('TWEETS', v)}
                        onChange={(v) => {console.log(v)}}
                    /> tweets,
                </li>

                <li>
                    <DynamicText
                        value={percentages.get('BLOGS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxBlogs).toFixed(0)}
                        onInput={(v) => rebalancePercents('BLOGS', v)}
                    /> short blog posts,
                </li>

                <li>
                    <DynamicText
                        value={percentages.get('LONG_BLOGS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxLongBlogs).toFixed(1)}
                        onInput={(v) => rebalancePercents('LONG_BLOGS', v)}
                    /> long blog posts or magazine articles, and &nbsp;
                </li>

                <li>
                    <DynamicText
                        value={percentages.get('BOOKS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxBooks).toFixed(1)}
                        onInput={(v) => rebalancePercents('BOOKS', v)}
                    /> books
                </li>
            </ul>

            {renderPictoralView()}
        </div>
    )
}

export default Reading
