export interface LighthouseReport {
    lighthouseVersion: string
    requestedUrl: string
    finalUrl: string
    fetchTime: string
    gatherMode: string
    runWarnings: any[]
    userAgent: string
    environment: Environment
    audits: Audits
    configSettings: ConfigSettings
    categories: Light
    categoryGroups: CategoryGroups
    stackPacks: any[]
    timing: Timing
    i18n: I18n
}

export interface Environment {
    networkUserAgent: string
    hostUserAgent: string
    benchmarkIndex: number
    credits: Credits
}

export interface Credits {
    "axe-core": string
}

export interface Audits {
    "is-on-https": IsOnHttps
    "service-worker": ServiceWorker
    viewport: Viewport
    "first-contentful-paint": FirstContentfulPaint
    "largest-contentful-paint": LargestContentfulPaint
    "first-meaningful-paint": FirstMeaningfulPaint
    "speed-index": SpeedIndex
    "screenshot-thumbnails": ScreenshotThumbnails
    "final-screenshot": FinalScreenshot
    "total-blocking-time": TotalBlockingTime
    "max-potential-fid": MaxPotentialFid
    "cumulative-layout-shift": CumulativeLayoutShift
    "errors-in-console": ErrorsInConsole
    "server-response-time": ServerResponseTime
    interactive: Interactive
    "user-timings": UserTimings
    "critical-request-chains": CriticalRequestChains
    redirects: Redirects
    "installable-manifest": InstallableManifest
    "apple-touch-icon": AppleTouchIcon
    "splash-screen": SplashScreen
    "themed-omnibox": ThemedOmnibox
    "maskable-icon": MaskableIcon
    "content-width": ContentWidth
    "image-aspect-ratio": ImageAspectRatio
    "image-size-responsive": ImageSizeResponsive
    "preload-fonts": PreloadFonts
    deprecations: Deprecations
    "mainthread-work-breakdown": MainthreadWorkBreakdown
    "bootup-time": BootupTime
    "uses-rel-preload": UsesRelPreload
    "uses-rel-preconnect": UsesRelPreconnect
    "font-display": FontDisplay
    diagnostics: Diagnostics
    "network-requests": NetworkRequests
    "network-rtt": NetworkRtt
    "network-server-latency": NetworkServerLatency
    "main-thread-tasks": MainThreadTasks
    metrics: Metrics
    "performance-budget": PerformanceBudget
    "timing-budget": TimingBudget
    "resource-summary": ResourceSummary
    "third-party-summary": ThirdPartySummary
    "third-party-facades": ThirdPartyFacades
    "largest-contentful-paint-element": LargestContentfulPaintElement
    "lcp-lazy-loaded": LcpLazyLoaded
    "layout-shift-elements": LayoutShiftElements
    "long-tasks": LongTasks
    "no-unload-listeners": NoUnloadListeners
    "non-composited-animations": NonCompositedAnimations
    "unsized-images": UnsizedImages
    "valid-source-maps": ValidSourceMaps
    "preload-lcp-image": PreloadLcpImage
    "csp-xss": CspXss
    "full-page-screenshot": FullPageScreenshot
    "script-treemap-data": ScriptTreemapData
    "pwa-cross-browser": PwaCrossBrowser
    "pwa-page-transitions": PwaPageTransitions
    "pwa-each-page-has-url": PwaEachPageHasUrl
    accesskeys: Accesskeys
    "aria-allowed-attr": AriaAllowedAttr
    "aria-command-name": AriaCommandName
    "aria-hidden-body": AriaHiddenBody
    "aria-hidden-focus": AriaHiddenFocus
    "aria-input-field-name": AriaInputFieldName
    "aria-meter-name": AriaMeterName
    "aria-progressbar-name": AriaProgressbarName
    "aria-required-attr": AriaRequiredAttr
    "aria-required-children": AriaRequiredChildren
    "aria-required-parent": AriaRequiredParent
    "aria-roles": AriaRoles
    "aria-toggle-field-name": AriaToggleFieldName
    "aria-tooltip-name": AriaTooltipName
    "aria-treeitem-name": AriaTreeitemName
    "aria-valid-attr-value": AriaValidAttrValue
    "aria-valid-attr": AriaValidAttr
    "button-name": ButtonName
    bypass: Bypass
    "color-contrast": ColorContrast
    "definition-list": DefinitionList
    dlitem: Dlitem
    "document-title": DocumentTitle
    "duplicate-id-active": DuplicateIdActive
    "duplicate-id-aria": DuplicateIdAria
    "form-field-multiple-labels": FormFieldMultipleLabels
    "frame-title": FrameTitle
    "heading-order": HeadingOrder
    "html-has-lang": HtmlHasLang
    "html-lang-valid": HtmlLangValid
    "image-alt": ImageAlt
    "input-image-alt": InputImageAlt
    label: Label
    "link-name": LinkName
    list: List
    listitem: Listitem
    "meta-refresh": MetaRefresh
    "meta-viewport": MetaViewport
    "object-alt": ObjectAlt
    tabindex: Tabindex
    "td-headers-attr": TdHeadersAttr
    "th-has-data-cells": ThHasDataCells
    "valid-lang": ValidLang
    "video-caption": VideoCaption
    "custom-controls-labels": CustomControlsLabels
    "custom-controls-roles": CustomControlsRoles
    "focus-traps": FocusTraps
    "focusable-controls": FocusableControls
    "interactive-element-affordance": InteractiveElementAffordance
    "logical-tab-order": LogicalTabOrder
    "managed-focus": ManagedFocus
    "offscreen-content-hidden": OffscreenContentHidden
    "use-landmarks": UseLandmarks
    "visual-order-follows-dom": VisualOrderFollowsDom
    "uses-long-cache-ttl": UsesLongCacheTtl
    "total-byte-weight": TotalByteWeight
    "offscreen-images": OffscreenImages
    "render-blocking-resources": RenderBlockingResources
    "unminified-css": UnminifiedCss
    "unminified-javascript": UnminifiedJavascript
    "unused-css-rules": UnusedCssRules
    "unused-javascript": UnusedJavascript
    "modern-image-formats": ModernImageFormats
    "uses-optimized-images": UsesOptimizedImages
    "uses-text-compression": UsesTextCompression
    "uses-responsive-images": UsesResponsiveImages
    "efficient-animated-content": EfficientAnimatedContent
    "duplicated-javascript": DuplicatedJavascript
    "legacy-javascript": LegacyJavascript
    doctype: Doctype
    charset: Charset
    "dom-size": DomSize
    "geolocation-on-start": GeolocationOnStart
    "inspector-issues": InspectorIssues
    "no-document-write": NoDocumentWrite
    "no-vulnerable-libraries": NoVulnerableLibraries
    "js-libraries": JsLibraries
    "notification-on-start": NotificationOnStart
    "password-inputs-can-be-pasted-into": PasswordInputsCanBePastedInto
    "uses-http2": UsesHttp2
    "uses-passive-event-listeners": UsesPassiveEventListeners
    "meta-description": MetaDescription
    "http-status-code": HttpStatusCode
    "font-size": FontSize
    "link-text": LinkText
    "crawlable-anchors": CrawlableAnchors
    "is-crawlable": IsCrawlable
    "robots-txt": RobotsTxt
    "tap-targets": TapTargets
    hreflang: Hreflang
    plugins: Plugins
    canonical: Canonical
    "structured-data": StructuredData
}

export interface IsOnHttps {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details
}

export interface Details {
    type: string
    headings: any[]
    items: any[]
}

export interface ServiceWorker {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface Viewport {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    warnings: any[]
}

export interface FirstContentfulPaint {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface LargestContentfulPaint {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface FirstMeaningfulPaint {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface SpeedIndex {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface ScreenshotThumbnails {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details2
}

export interface Details2 {
    type: string
    scale: number
    items: Item[]
}

export interface Item {
    timing: number
    timestamp: number
    data: string
}

export interface FinalScreenshot {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details3
}

export interface Details3 {
    type: string
    timing: number
    timestamp: number
    data: string
}

export interface TotalBlockingTime {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface MaxPotentialFid {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface CumulativeLayoutShift {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details4
}

export interface Details4 {
    type: string
    items: Item2[]
}

export interface Item2 {
    cumulativeLayoutShiftMainFrame: number
    totalCumulativeLayoutShift: number
}

export interface ErrorsInConsole {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details5
}

export interface Details5 {
    type: string
    headings: Heading[]
    items: Item3[]
}

export interface Heading {
    key: string
    itemType: string
    text: string
}

export interface Item3 {
    source: string
    description: string
    sourceLocation: SourceLocation
}

export interface SourceLocation {
    type: string
    url: string
    urlProvider: string
    line: number
    column: number
}

export interface ServerResponseTime {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details6
}

export interface Details6 {
    type: string
    headings: Heading2[]
    items: Item4[]
    overallSavingsMs: number
}

export interface Heading2 {
    key: string
    valueType: string
    label: string
}

export interface Item4 {
    url: string
    responseTime: number
}

export interface Interactive {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
}

export interface UserTimings {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details7
}

export interface Details7 {
    type: string
    headings: any[]
    items: any[]
}

export interface CriticalRequestChains {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details8
}

export interface Details8 {
    type: string
    chains: Chains
    longestChain: LongestChain
}

export interface Chains {
    "0926F47FEDB92BDF9F14A0954806AD6B": N0926F47Fedb92Bdf9F14A0954806Ad6B
}

export interface N0926F47Fedb92Bdf9F14A0954806Ad6B {
    request: Request
    children: Children
}

export interface Request {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface Children {
    "45875.2": N458752
    "45875.3": N458753
    "45875.4": N458754
    "45875.5": N458755
    "45875.6": N458756
}

export interface N458752 {
    request: Request2
    children: Children2
}

export interface Request2 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface Children2 {
    "45875.9": N458759
    "45875.10": N4587510
    "45875.25": N4587525
    "45875.13": N4587513
    "45875.16": N4587516
}

export interface N458759 {
    request: Request3
}

export interface Request3 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N4587510 {
    request: Request4
}

export interface Request4 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N4587525 {
    request: Request5
}

export interface Request5 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N4587513 {
    request: Request6
}

export interface Request6 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N4587516 {
    request: Request7
}

export interface Request7 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N458753 {
    request: Request8
}

export interface Request8 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N458754 {
    request: Request9
}

export interface Request9 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N458755 {
    request: Request10
}

export interface Request10 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface N458756 {
    request: Request11
}

export interface Request11 {
    url: string
    startTime: number
    endTime: number
    responseReceivedTime: number
    transferSize: number
}

export interface LongestChain {
    duration: number
    length: number
    transferSize: number
}

export interface Redirects {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details9
}

export interface Details9 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
}

export interface InstallableManifest {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details10
}

export interface Details10 {
    type: string
    headings: Heading3[]
    items: Item5[]
    debugData: DebugData
}

export interface Heading3 {
    key: string
    itemType: string
    text: string
}

export interface Item5 {
    reason: string
}

export interface DebugData {
    type: string
    manifestUrl: any
}

export interface AppleTouchIcon {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    warnings: string[]
}

export interface SplashScreen {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    explanation: string
    details: Details11
}

export interface Details11 {
    type: string
    items: Item6[]
}

export interface Item6 {
    failures: string[]
    isParseFailure: boolean
    parseFailureReason: string
}

export interface ThemedOmnibox {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    explanation: string
    details: Details12
}

export interface Details12 {
    type: string
    items: Item7[]
}

export interface Item7 {
    failures: string[]
    themeColor: any
    isParseFailure: boolean
    parseFailureReason: string
}

export interface MaskableIcon {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    explanation: string
}

export interface ContentWidth {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface ImageAspectRatio {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details13
}

export interface Details13 {
    type: string
    headings: any[]
    items: any[]
}

export interface ImageSizeResponsive {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details14
}

export interface Details14 {
    type: string
    headings: any[]
    items: any[]
}

export interface PreloadFonts {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface Deprecations {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details15
}

export interface Details15 {
    type: string
    headings: any[]
    items: any[]
}

export interface MainthreadWorkBreakdown {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details16
}

export interface Details16 {
    type: string
    headings: Heading4[]
    items: Item8[]
}

export interface Heading4 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item8 {
    group: string
    groupLabel: string
    duration: number
}

export interface BootupTime {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details17
}

export interface Details17 {
    type: string
    headings: Heading5[]
    items: Item9[]
    summary: Summary
}

export interface Heading5 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item9 {
    url: string
    total: number
    scripting: number
    scriptParseCompile: number
}

export interface Summary {
    wastedMs: number
}

export interface UsesRelPreload {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details18
}

export interface Details18 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
}

export interface UsesRelPreconnect {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details19
}

export interface Details19 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
}

export interface FontDisplay {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    warnings: any[]
    details: Details20
}

export interface Details20 {
    type: string
    headings: Heading6[]
    items: Item10[]
}

export interface Heading6 {
    key: string
    itemType: string
    text: string
}

export interface Item10 {
    url: string
    wastedMs: number
}

export interface Diagnostics {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details21
}

export interface Details21 {
    type: string
    items: Item11[]
}

export interface Item11 {
    numRequests: number
    numScripts: number
    numStylesheets: number
    numFonts: number
    numTasks: number
    numTasksOver10ms: number
    numTasksOver25ms: number
    numTasksOver50ms: number
    numTasksOver100ms: number
    numTasksOver500ms: number
    rtt: number
    throughput: number
    maxRtt: number
    maxServerLatency: number
    totalByteWeight: number
    totalTaskTime: number
    mainDocumentTransferSize: number
}

export interface NetworkRequests {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details22
}

export interface Details22 {
    type: string
    headings: Heading7[]
    items: Item12[]
    debugData: DebugData2
}

export interface Heading7 {
    key: string
    itemType: string
    text: string
    granularity?: number
    displayUnit?: string
}

export interface Item12 {
    url: string
    protocol: string
    rendererStartTime: number
    startTime: number
    endTime: number
    finished: boolean
    transferSize: number
    resourceSize: number
    statusCode: number
    mimeType: string
    resourceType: string
    priority: string
    experimentalFromMainFrame: boolean
}

export interface DebugData2 {
    type: string
    networkStartTimeTs: number
}

export interface NetworkRtt {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details23
}

export interface Details23 {
    type: string
    headings: Heading8[]
    items: Item13[]
}

export interface Heading8 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item13 {
    origin: string
    rtt: number
}

export interface NetworkServerLatency {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details24
}

export interface Details24 {
    type: string
    headings: Heading9[]
    items: Item14[]
}

export interface Heading9 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item14 {
    origin: string
    serverResponseTime: number
}

export interface MainThreadTasks {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details25
}

export interface Details25 {
    type: string
    headings: Heading10[]
    items: Item15[]
}

export interface Heading10 {
    key: string
    itemType: string
    granularity: number
    text: string
}

export interface Item15 {
    duration: number
    startTime: number
}

export interface Metrics {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    details: Details26
}

export interface Details26 {
    type: string
    items: Item16[]
}

export interface Item16 {
    firstContentfulPaint?: number
    firstMeaningfulPaint?: number
    largestContentfulPaint?: number
    interactive?: number
    speedIndex?: number
    totalBlockingTime?: number
    maxPotentialFID?: number
    cumulativeLayoutShift?: number
    cumulativeLayoutShiftMainFrame?: number
    totalCumulativeLayoutShift?: number
    observedTimeOrigin?: number
    observedTimeOriginTs?: number
    observedNavigationStart?: number
    observedNavigationStartTs?: number
    observedFirstPaint?: number
    observedFirstPaintTs?: number
    observedFirstContentfulPaint?: number
    observedFirstContentfulPaintTs?: number
    observedFirstContentfulPaintAllFrames?: number
    observedFirstContentfulPaintAllFramesTs?: number
    observedFirstMeaningfulPaint?: number
    observedFirstMeaningfulPaintTs?: number
    observedLargestContentfulPaint?: number
    observedLargestContentfulPaintTs?: number
    observedLargestContentfulPaintAllFrames?: number
    observedLargestContentfulPaintAllFramesTs?: number
    observedTraceEnd?: number
    observedTraceEndTs?: number
    observedLoad?: number
    observedLoadTs?: number
    observedDomContentLoaded?: number
    observedDomContentLoadedTs?: number
    observedCumulativeLayoutShift?: number
    observedCumulativeLayoutShiftMainFrame?: number
    observedTotalCumulativeLayoutShift?: number
    observedFirstVisualChange?: number
    observedFirstVisualChangeTs?: number
    observedLastVisualChange?: number
    observedLastVisualChangeTs?: number
    observedSpeedIndex?: number
    observedSpeedIndexTs?: number
    lcpInvalidated?: boolean
}

export interface PerformanceBudget {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface TimingBudget {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface ResourceSummary {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details27
}

export interface Details27 {
    type: string
    headings: Heading11[]
    items: Item17[]
}

export interface Heading11 {
    key: string
    itemType: string
    text: string
}

export interface Item17 {
    resourceType: string
    label: string
    requestCount: number
    transferSize: number
}

export interface ThirdPartySummary {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    displayValue: string
    details: Details28
}

export interface Details28 {
    type: string
    headings: Heading12[]
    items: Item18[]
    summary: Summary2
}

export interface Heading12 {
    key: string
    itemType: string
    text: string
    subItemsHeading: SubItemsHeading
    granularity?: number
}

export interface SubItemsHeading {
    key: string
    itemType?: string
}

export interface Item18 {
    mainThreadTime: number
    blockingTime: number
    transferSize: number
    entity: Entity
    subItems: SubItems
}

export interface Entity {
    type: string
    text: string
    url: string
}

export interface SubItems {
    type: string
    items: Item19[]
}

export interface Item19 {
    url: string
    mainThreadTime: number
    blockingTime: number
    transferSize: number
}

export interface Summary2 {
    wastedBytes: number
    wastedMs: number
}

export interface ThirdPartyFacades {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface LargestContentfulPaintElement {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details29
}

export interface Details29 {
    type: string
    headings: Heading13[]
    items: Item20[]
}

export interface Heading13 {
    key: string
    itemType: string
    text: string
}

export interface Item20 {
    node: Node
}

export interface Node {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect
    snippet: string
    nodeLabel: string
}

export interface BoundingRect {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface LcpLazyLoaded {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface LayoutShiftElements {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details30
}

export interface Details30 {
    type: string
    headings: Heading14[]
    items: Item21[]
}

export interface Heading14 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item21 {
    node: Node2
    score: number
}

export interface Node2 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect2
    snippet: string
    nodeLabel: string
}

export interface BoundingRect2 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface LongTasks {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details31
}

export interface Details31 {
    type: string
    headings: Heading15[]
    items: Item22[]
}

export interface Heading15 {
    key: string
    itemType: string
    text: string
    granularity?: number
}

export interface Item22 {
    url: string
    duration: number
    startTime: number
}

export interface NoUnloadListeners {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface NonCompositedAnimations {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    displayValue: string
    details: Details32
}

export interface Details32 {
    type: string
    headings: Heading16[]
    items: Item23[]
}

export interface Heading16 {
    key?: string
    itemType: string
    subItemsHeading: SubItemsHeading2
    text: string
}

export interface SubItemsHeading2 {
    key: string
    itemType: string
}

export interface Item23 {
    node: Node3
    subItems: SubItems2
}

export interface Node3 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect3
    snippet: string
    nodeLabel: string
}

export interface BoundingRect3 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface SubItems2 {
    type: string
    items: Item24[]
}

export interface Item24 {
    failureReason: string
    animation: string
}

export interface UnsizedImages {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details33
}

export interface Details33 {
    type: string
    headings: Heading17[]
    items: Item25[]
}

export interface Heading17 {
    key: string
    itemType: string
    text: string
}

export interface Item25 {
    url: string
    node: Node4
}

export interface Node4 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect4
    snippet: string
    nodeLabel: string
}

export interface BoundingRect4 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface ValidSourceMaps {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details34
}

export interface Details34 {
    type: string
    headings: Heading18[]
    items: Item26[]
}

export interface Heading18 {
    key: string
    itemType: string
    subItemsHeading?: SubItemsHeading3
    text: string
}

export interface SubItemsHeading3 {
    key: string
}

export interface Item26 {
    scriptUrl: string
    sourceMapUrl: string
    subItems: SubItems3
}

export interface SubItems3 {
    type: string
    items: Item27[]
}

export interface Item27 {
    error: string
}

export interface PreloadLcpImage {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface CspXss {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details35
}

export interface Details35 {
    type: string
    headings: Heading19[]
    items: Item28[]
}

export interface Heading19 {
    key: string
    itemType: string
    subItemsHeading: SubItemsHeading4
    text: string
}

export interface SubItemsHeading4 {
    key: string
}

export interface Item28 {
    severity: string
    description: string
}

export interface FullPageScreenshot {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details36
}

export interface Details36 {
    type: string
    screenshot: Screenshot
    nodes: Nodes
}

export interface Screenshot {
    data: string
    width: number
    height: number
}

export interface Nodes {
    "page-0-IMG": Page0Img
    "page-1-IMG": Page1Img
    "page-2-IMG": Page2Img
    "page-3-IMG": Page3Img
    "page-4-IMG": Page4Img
    "page-5-IMG": Page5Img
    "page-6-IMG": Page6Img
    "page-7-IMG": Page7Img
    "page-8-IMG": Page8Img
    "page-9-P": Page9P
    "page-10-BODY": Page10Body
    "page-11-DIV": Page11Div
    "page-12-DIV": Page12Div
    "page-13-A": Page13A
    "page-14-SECTION": Page14Section
    "page-15-DIV": Page15Div
    "page-16-A": Page16A
    "page-17-BUTTON": Page17Button
    "page-18-A": Page18A
    "page-19-A": Page19A
    "page-20-MAIN": Page20Main
    "page-21-A": Page21A
    "page-22-A": Page22A
    "page-23-::before": Page23Before
    "page-24-::before": Page24Before
    "page-25-::before": Page25Before
    "page-26-::before": Page26Before
    "page-27-svg": Page27Svg
    "page-28-NAV": Page28Nav
    "4-0-A": N40A
    "4-1-A": N41A
    "4-2-A": N42A
    "4-3-A": N43A
    "4-4-A": N44A
    "4-5-A": N45A
    "4-6-A": N46A
    "4-7-A": N47A
    "4-8-A": N48A
    "4-9-A": N49A
    "4-10-A": N410A
    "4-11-A": N411A
    "4-12-A": N412A
    "4-13-A": N413A
    "4-14-A": N414A
    "4-15-A": N415A
    "4-16-A": N416A
    "4-17-A": N417A
    "4-18-A": N418A
    "4-19-A": N419A
    "4-20-A": N420A
    "4-21-A": N421A
    "4-22-A": N422A
    "4-23-A": N423A
    "4-24-A": N424A
    "4-25-A": N425A
    "4-26-A": N426A
    "4-27-A": N427A
    "4-28-A": N428A
    "4-29-A": N429A
    "4-30-A": N430A
    "4-31-A": N431A
    "4-32-A": N432A
    "4-33-A": N433A
    "4-34-A": N434A
    "4-35-A": N435A
    "4-36-A": N436A
    "4-37-A": N437A
    "4-38-A": N438A
    "4-39-A": N439A
    "4-40-A": N440A
    "4-41-A": N441A
    "4-42-A": N442A
    "4-43-A": N443A
    "4-44-A": N444A
    "4-45-LINK": N445Link
    "4-46-LINK": N446Link
    "4-47-LINK": N447Link
    "4-48-LINK": N448Link
    "4-49-LINK": N449Link
    "4-50-META": N450Meta
    "4-51-META": N451Meta
    "4-52-META": N452Meta
    "4-53-META": N453Meta
    "4-54-META": N454Meta
    "4-55-META": N455Meta
    "4-56-META": N456Meta
    "4-57-META": N457Meta
    "4-58-META": N458Meta
    "4-59-META": N459Meta
    "4-60-META": N460Meta
    "4-61-META": N461Meta
    "4-62-META": N462Meta
    "4-63-META": N463Meta
    "4-64-META": N464Meta
    "4-65-META": N465Meta
    "4-66-META": N466Meta
    "4-67-META": N467Meta
    "4-68-META": N468Meta
    "4-69-META": N469Meta
    "4-70-SCRIPT": N470Script
    "4-71-SCRIPT": N471Script
    "4-72-SCRIPT": N472Script
    "4-73-SCRIPT": N473Script
    "4-74-SCRIPT": N474Script
    "4-75-SCRIPT": N475Script
    "4-76-SCRIPT": N476Script
    "4-77-FORM": N477Form
    "4-78-LABEL": N478Label
    "4-79-LABEL": N479Label
    "4-80-TEXTAREA": N480Textarea
    "4-81-INPUT": N481Input
    "4-82-INPUT": N482Input
    "4-83-use": N483Use
    "4-84-svg": N484Svg
    "4-85-DIV": N485Div
    "4-86-H1": N486H1
    "4-87-BODY": N487Body
    "4-88-P": N488P
    "4-89-SPAN": N489Span
    "4-90-BUTTON": N490Button
    "4-91-DIV": N491Div
}

export interface Page0Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page1Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page2Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page3Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page4Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page5Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page6Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page7Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page8Img {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page9P {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page10Body {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page11Div {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page12Div {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page13A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page14Section {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page15Div {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page16A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page17Button {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page18A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page19A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page20Main {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page21A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page22A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page23Before {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page24Before {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page25Before {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page26Before {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page27Svg {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Page28Nav {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N40A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N41A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N42A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N43A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N44A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N45A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N46A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N47A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N48A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N49A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N410A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N411A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N412A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N413A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N414A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N415A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N416A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N417A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N418A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N419A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N420A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N421A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N422A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N423A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N424A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N425A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N426A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N427A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N428A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N429A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N430A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N431A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N432A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N433A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N434A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N435A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N436A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N437A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N438A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N439A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N440A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N441A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N442A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N443A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N444A {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N445Link {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N446Link {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N447Link {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N448Link {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N449Link {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N450Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N451Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N452Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N453Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N454Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N455Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N456Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N457Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N458Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N459Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N460Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N461Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N462Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N463Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N464Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N465Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N466Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N467Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N468Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N469Meta {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N470Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N471Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N472Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N473Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N474Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N475Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N476Script {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N477Form {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N478Label {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N479Label {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N480Textarea {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N481Input {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N482Input {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N483Use {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N484Svg {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N485Div {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N486H1 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N487Body {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N488P {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N489Span {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N490Button {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface N491Div {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface ScriptTreemapData {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details37
}

export interface Details37 {
    type: string
    nodes: Node5[]
}

export interface Node5 {
    name: string
    resourceBytes: number
    unusedBytes?: number
}

export interface PwaCrossBrowser {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface PwaPageTransitions {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface PwaEachPageHasUrl {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface Accesskeys {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaAllowedAttr {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details38
}

export interface Details38 {
    type: string
    headings: Heading20[]
    items: Item29[]
    debugData: DebugData3
}

export interface Heading20 {
    key: string
    itemType: string
    subItemsHeading: SubItemsHeading5
    text: string
}

export interface SubItemsHeading5 {
    key: string
    itemType: string
}

export interface Item29 {
    node: Node6
}

export interface Node6 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect5
    snippet: string
    nodeLabel: string
    explanation: string
}

export interface BoundingRect5 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface DebugData3 {
    type: string
    impact: string
    tags: string[]
}

export interface AriaCommandName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaHiddenBody {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details39
}

export interface Details39 {
    type: string
    headings: any[]
    items: any[]
}

export interface AriaHiddenFocus {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details40
}

export interface Details40 {
    type: string
    headings: any[]
    items: any[]
}

export interface AriaInputFieldName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaMeterName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaProgressbarName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaRequiredAttr {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaRequiredChildren {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaRequiredParent {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaRoles {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaToggleFieldName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaTooltipName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaTreeitemName {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface AriaValidAttrValue {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details41
}

export interface Details41 {
    type: string
    headings: any[]
    items: any[]
}

export interface AriaValidAttr {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details42
}

export interface Details42 {
    type: string
    headings: any[]
    items: any[]
}

export interface ButtonName {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details43
}

export interface Details43 {
    type: string
    headings: any[]
    items: any[]
}

export interface Bypass {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details44
}

export interface Details44 {
    type: string
    headings: any[]
    items: any[]
}

export interface ColorContrast {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details45
}

export interface Details45 {
    type: string
    headings: Heading21[]
    items: Item30[]
    debugData: DebugData4
}

export interface Heading21 {
    key: string
    itemType: string
    subItemsHeading: SubItemsHeading6
    text: string
}

export interface SubItemsHeading6 {
    key: string
    itemType: string
}

export interface Item30 {
    node: Node7
    subItems?: SubItems4
}

export interface Node7 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect6
    snippet: string
    nodeLabel: string
    explanation: string
}

export interface BoundingRect6 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface SubItems4 {
    type: string
    items: Item31[]
}

export interface Item31 {
    relatedNode: RelatedNode
}

export interface RelatedNode {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect7
    snippet: string
    nodeLabel: string
}

export interface BoundingRect7 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface DebugData4 {
    type: string
    impact: string
    tags: string[]
}

export interface DefinitionList {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface Dlitem {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface DocumentTitle {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details46
}

export interface Details46 {
    type: string
    headings: any[]
    items: any[]
}

export interface DuplicateIdActive {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface DuplicateIdAria {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details47
}

export interface Details47 {
    type: string
    headings: any[]
    items: any[]
}

export interface FormFieldMultipleLabels {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface FrameTitle {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface HeadingOrder {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details48
}

export interface Details48 {
    type: string
    headings: any[]
    items: any[]
}

export interface HtmlHasLang {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details49
}

export interface Details49 {
    type: string
    headings: any[]
    items: any[]
}

export interface HtmlLangValid {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details50
}

export interface Details50 {
    type: string
    headings: any[]
    items: any[]
}

export interface ImageAlt {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details51
}

export interface Details51 {
    type: string
    headings: any[]
    items: any[]
}

export interface InputImageAlt {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface Label {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface LinkName {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details52
}

export interface Details52 {
    type: string
    headings: any[]
    items: any[]
}

export interface List {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details53
}

export interface Details53 {
    type: string
    headings: any[]
    items: any[]
}

export interface Listitem {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details54
}

export interface Details54 {
    type: string
    headings: any[]
    items: any[]
}

export interface MetaRefresh {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface MetaViewport {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details55
}

export interface Details55 {
    type: string
    headings: Heading22[]
    items: Item32[]
    debugData: DebugData5
}

export interface Heading22 {
    key: string
    itemType: string
    subItemsHeading: SubItemsHeading7
    text: string
}

export interface SubItemsHeading7 {
    key: string
    itemType: string
}

export interface Item32 {
    node: Node8
}

export interface Node8 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect8
    snippet: string
    nodeLabel: string
    explanation: string
}

export interface BoundingRect8 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface DebugData5 {
    type: string
    impact: string
    tags: string[]
}

export interface ObjectAlt {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface Tabindex {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details56
}

export interface Details56 {
    type: string
    headings: any[]
    items: any[]
}

export interface TdHeadersAttr {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface ThHasDataCells {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface ValidLang {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface VideoCaption {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface CustomControlsLabels {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface CustomControlsRoles {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface FocusTraps {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface FocusableControls {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface InteractiveElementAffordance {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface LogicalTabOrder {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface ManagedFocus {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface OffscreenContentHidden {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface UseLandmarks {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface VisualOrderFollowsDom {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface UsesLongCacheTtl {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details57
}

export interface Details57 {
    type: string
    headings: Heading23[]
    items: Item33[]
    summary: Summary3
}

export interface Heading23 {
    key: string
    itemType: string
    text: string
    displayUnit?: string
    granularity?: number
}

export interface Item33 {
    url: string
    debugData: DebugData6
    cacheLifetimeMs: number
    cacheHitProbability: number
    totalBytes: number
    wastedBytes: number
}

export interface DebugData6 {
    type: string
    "max-age": number
    public?: boolean
}

export interface Summary3 {
    wastedBytes: number
}

export interface TotalByteWeight {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details58
}

export interface Details58 {
    type: string
    headings: Heading24[]
    items: Item34[]
}

export interface Heading24 {
    key: string
    itemType: string
    text: string
}

export interface Item34 {
    url: string
    totalBytes: number
}

export interface OffscreenImages {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details59
}

export interface Details59 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface RenderBlockingResources {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details60
}

export interface Details60 {
    type: string
    headings: Heading25[]
    items: Item35[]
    overallSavingsMs: number
}

export interface Heading25 {
    key: string
    valueType: string
    label: string
}

export interface Item35 {
    url: string
    totalBytes: number
    wastedMs: number
}

export interface UnminifiedCss {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details61
}

export interface Details61 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface UnminifiedJavascript {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details62
}

export interface Details62 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface UnusedCssRules {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details63
}

export interface Details63 {
    type: string
    headings: Heading26[]
    items: Item36[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface Heading26 {
    key: string
    valueType: string
    label: string
}

export interface Item36 {
    url: string
    wastedBytes: number
    wastedPercent: number
    totalBytes: number
}

export interface UnusedJavascript {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details64
}

export interface Details64 {
    type: string
    headings: Heading27[]
    items: Item37[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface Heading27 {
    key: string
    valueType: string
    subItemsHeading: SubItemsHeading8
    label: string
}

export interface SubItemsHeading8 {
    key: string
    valueType?: string
}

export interface Item37 {
    url: string
    totalBytes: number
    wastedBytes: number
    wastedPercent: number
}

export interface ModernImageFormats {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details65
}

export interface Details65 {
    type: string
    headings: Heading28[]
    items: Item38[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface Heading28 {
    key: string
    valueType: string
    label: string
}

export interface Item38 {
    node: Node9
    url: string
    fromProtocol: boolean
    isCrossOrigin: boolean
    totalBytes: number
    wastedBytes: number
    wastedWebpBytes: number
}

export interface Node9 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect9
    snippet: string
    nodeLabel: string
}

export interface BoundingRect9 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface UsesOptimizedImages {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    warnings: any[]
    details: Details66
}

export interface Details66 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface UsesTextCompression {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details67
}

export interface Details67 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface UsesResponsiveImages {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details68
}

export interface Details68 {
    type: string
    headings: Heading29[]
    items: Item39[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface Heading29 {
    key: string
    valueType: string
    label: string
}

export interface Item39 {
    node: Node10
    url: string
    totalBytes: number
    wastedBytes: number
    wastedPercent: number
}

export interface Node10 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect10
    snippet: string
    nodeLabel: string
}

export interface BoundingRect10 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface EfficientAnimatedContent {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details69
}

export interface Details69 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface DuplicatedJavascript {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details70
}

export interface Details70 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface LegacyJavascript {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details71
}

export interface Details71 {
    type: string
    headings: Heading30[]
    items: Item40[]
    overallSavingsMs: number
    overallSavingsBytes: number
}

export interface Heading30 {
    key?: string
    valueType: string
    subItemsHeading?: SubItemsHeading9
    label: string
}

export interface SubItemsHeading9 {
    key: string
    valueType?: string
}

export interface Item40 {
    url: string
    wastedBytes: number
    subItems: SubItems5
    totalBytes: number
}

export interface SubItems5 {
    type: string
    items: Item41[]
}

export interface Item41 {
    signal: string
    location: Location
}

export interface Location {
    type: string
    url: string
    urlProvider: string
    line: number
    column: number
}

export interface Doctype {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface Charset {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface DomSize {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    displayValue: string
    details: Details72
}

export interface Details72 {
    type: string
    headings: Heading31[]
    items: Item42[]
}

export interface Heading31 {
    key: string
    itemType: string
    text: string
}

export interface Item42 {
    statistic: string
    value: number
    node?: Node11
}

export interface Node11 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect11
    snippet: string
    nodeLabel: string
}

export interface BoundingRect11 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface GeolocationOnStart {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details73
}

export interface Details73 {
    type: string
    headings: any[]
    items: any[]
}

export interface InspectorIssues {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details74
}

export interface Details74 {
    type: string
    headings: any[]
    items: any[]
}

export interface NoDocumentWrite {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details75
}

export interface Details75 {
    type: string
    headings: any[]
    items: any[]
}

export interface NoVulnerableLibraries {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    displayValue: string
    details: Details76
}

export interface Details76 {
    type: string
    headings: Heading32[]
    items: Item43[]
    summary: Summary4
}

export interface Heading32 {
    key: string
    itemType: string
    text: string
}

export interface Item43 {
    highestSeverity: string
    vulnCount: number
    detectedLib: DetectedLib
}

export interface DetectedLib {
    text: string
    url: string
    type: string
}

export interface Summary4 {}

export interface JsLibraries {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
    details: Details77
}

export interface Details77 {
    type: string
    headings: Heading33[]
    items: Item44[]
    summary: Summary5
    debugData: DebugData7
}

export interface Heading33 {
    key: string
    itemType: string
    text: string
}

export interface Item44 {
    name: string
    version?: string
    npm: string
}

export interface Summary5 {}

export interface DebugData7 {
    type: string
    stacks: Stack[]
}

export interface Stack {
    id: string
    version?: string
}

export interface NotificationOnStart {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details78
}

export interface Details78 {
    type: string
    headings: any[]
    items: any[]
}

export interface PasswordInputsCanBePastedInto {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details79
}

export interface Details79 {
    type: string
    headings: any[]
    items: any[]
}

export interface UsesHttp2 {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    numericValue: number
    numericUnit: string
    details: Details80
}

export interface Details80 {
    type: string
    headings: any[]
    items: any[]
    overallSavingsMs: number
}

export interface UsesPassiveEventListeners {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details81
}

export interface Details81 {
    type: string
    headings: Heading34[]
    items: Item45[]
}

export interface Heading34 {
    key: string
    itemType: string
    text: string
}

export interface Item45 {
    source: Source
}

export interface Source {
    type: string
    url: string
    urlProvider: string
    line: number
    column: number
}

export interface MetaDescription {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface HttpStatusCode {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
}

export interface FontSize {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    displayValue: string
    details: Details82
}

export interface Details82 {
    type: string
    headings: Heading35[]
    items: Item46[]
}

export interface Heading35 {
    key: string
    itemType: string
    text: string
}

export interface Item46 {
    source: Source2
    selector: string
    coverage: string
    fontSize: string
}

export interface Source2 {
    type: string
    value: string
}

export interface LinkText {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details83
}

export interface Details83 {
    type: string
    headings: any[]
    items: any[]
    summary: Summary6
}

export interface Summary6 {}

export interface CrawlableAnchors {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details84
}

export interface Details84 {
    type: string
    headings: Heading36[]
    items: Item47[]
}

export interface Heading36 {
    key: string
    itemType: string
    text: string
}

export interface Item47 {
    node: Node12
}

export interface Node12 {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect12
    snippet: string
    nodeLabel: string
}

export interface BoundingRect12 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface IsCrawlable {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details85
}

export interface Details85 {
    type: string
    headings: any[]
    items: any[]
}

export interface RobotsTxt {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details86
}

export interface Details86 {
    type: string
    headings: any[]
    items: any[]
    summary: Summary7
}

export interface Summary7 {}

export interface TapTargets {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    displayValue: string
    details: Details87
}

export interface Details87 {
    type: string
    headings: Heading37[]
    items: Item48[]
}

export interface Heading37 {
    key: string
    itemType: string
    text: string
}

export interface Item48 {
    tapTarget: TapTarget
    overlappingTarget: OverlappingTarget
    tapTargetScore: number
    overlappingTargetScore: number
    overlapScoreRatio: number
    size: string
    width: number
    height: number
}

export interface TapTarget {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect13
    snippet: string
    nodeLabel: string
}

export interface BoundingRect13 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface OverlappingTarget {
    type: string
    lhId: string
    path: string
    selector: string
    boundingRect: BoundingRect14
    snippet: string
    nodeLabel: string
}

export interface BoundingRect14 {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
}

export interface Hreflang {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details88
}

export interface Details88 {
    type: string
    headings: any[]
    items: any[]
}

export interface Plugins {
    id: string
    title: string
    description: string
    score: number
    scoreDisplayMode: string
    details: Details89
}

export interface Details89 {
    type: string
    headings: any[]
    items: any[]
}

export interface Canonical {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface StructuredData {
    id: string
    title: string
    description: string
    score: any
    scoreDisplayMode: string
}

export interface ConfigSettings {
    output: string[]
    maxWaitForFcp: number
    maxWaitForLoad: number
    formFactor: string
    throttling: Throttling
    throttlingMethod: string
    screenEmulation: ScreenEmulation
    emulatedUserAgent: string
    auditMode: boolean
    gatherMode: boolean
    disableStorageReset: boolean
    debugNavigation: boolean
    channel: string
    budgets: any
    locale: string
    blockedUrlPatterns: any
    additionalTraceCategories: any
    extraHeaders: any
    precomputedLanternData: any
    onlyAudits: any
    onlyCategories: any
    skipAudits: any
}

export interface Throttling {
    rttMs: number
    throughputKbps: number
    requestLatencyMs: number
    downloadThroughputKbps: number
    uploadThroughputKbps: number
    cpuSlowdownMultiplier: number
}

export interface ScreenEmulation {
    mobile: boolean
    width: number
    height: number
    deviceScaleFactor: number
    disabled: boolean
}

export interface Categories {
    performance: Performance
    accessibility: Accessibility
    "best-practices": BestPractices
    seo: Seo
    pwa: Pwa
}

export interface Performance {
    title: string
    supportedModes: string[]
    auditRefs: AuditRef[]
    id: string
    score: number
}

export interface AuditRef {
    id: string
    weight: number
    group?: string
    acronym?: string
    relevantAudits?: string[]
}

export interface Accessibility {
    title: string
    description: string
    manualDescription: string
    supportedModes: string[]
    auditRefs: AuditRef2[]
    id: string
    score: number
}

export interface AuditRef2 {
    id: string
    weight: number
    group?: string
}

export interface BestPractices {
    title: string
    supportedModes: string[]
    auditRefs: AuditRef3[]
    id: string
    score: number
}

export interface AuditRef3 {
    id: string
    weight: number
    group: string
}

export interface Seo {
    title: string
    description: string
    manualDescription: string
    supportedModes: string[]
    auditRefs: AuditRef4[]
    id: string
    score: number
}

export interface AuditRef4 {
    id: string
    weight: number
    group?: string
}

export interface Pwa {
    title: string
    description: string
    manualDescription: string
    supportedModes: string[]
    auditRefs: AuditRef5[]
    id: string
    score: number
}

export interface AuditRef5 {
    id: string
    weight: number
    group?: string
}

export interface CategoryGroups {
    metrics: Metrics2
    "load-opportunities": LoadOpportunities
    budgets: Budgets
    diagnostics: Diagnostics2
    "pwa-installable": PwaInstallable
    "pwa-optimized": PwaOptimized
    "a11y-best-practices": A11yBestPractices
    "a11y-color-contrast": A11yColorContrast
    "a11y-names-labels": A11yNamesLabels
    "a11y-navigation": A11yNavigation
    "a11y-aria": A11yAria
    "a11y-language": A11yLanguage
    "a11y-audio-video": A11yAudioVideo
    "a11y-tables-lists": A11yTablesLists
    "seo-mobile": SeoMobile
    "seo-content": SeoContent
    "seo-crawl": SeoCrawl
    "best-practices-trust-safety": BestPracticesTrustSafety
    "best-practices-ux": BestPracticesUx
    "best-practices-browser-compat": BestPracticesBrowserCompat
    "best-practices-general": BestPracticesGeneral
    hidden: Hidden
}

export interface Metrics2 {
    title: string
}

export interface LoadOpportunities {
    title: string
    description: string
}

export interface Budgets {
    title: string
    description: string
}

export interface Diagnostics2 {
    title: string
    description: string
}

export interface PwaInstallable {
    title: string
}

export interface PwaOptimized {
    title: string
}

export interface A11yBestPractices {
    title: string
    description: string
}

export interface A11yColorContrast {
    title: string
    description: string
}

export interface A11yNamesLabels {
    title: string
    description: string
}

export interface A11yNavigation {
    title: string
    description: string
}

export interface A11yAria {
    title: string
    description: string
}

export interface A11yLanguage {
    title: string
    description: string
}

export interface A11yAudioVideo {
    title: string
    description: string
}

export interface A11yTablesLists {
    title: string
    description: string
}

export interface SeoMobile {
    title: string
    description: string
}

export interface SeoContent {
    title: string
    description: string
}

export interface SeoCrawl {
    title: string
    description: string
}

export interface BestPracticesTrustSafety {
    title: string
}

export interface BestPracticesUx {
    title: string
}

export interface BestPracticesBrowserCompat {
    title: string
}

export interface BestPracticesGeneral {
    title: string
}

export interface Hidden {
    title: string
}

export interface Timing {
    entries: Entry[]
    total: number
}

export interface Entry {
    startTime: number
    name: string
    duration: number
    entryType: string
}

export interface I18n {
    rendererFormattedStrings: RendererFormattedStrings
    icuMessagePaths: IcuMessagePaths
}

export interface RendererFormattedStrings {
    calculatorLink: string
    collapseView: string
    crcInitialNavigation: string
    crcLongestDurationLabel: string
    dropdownCopyJSON: string
    dropdownDarkTheme: string
    dropdownPrintExpanded: string
    dropdownPrintSummary: string
    dropdownSaveGist: string
    dropdownSaveHTML: string
    dropdownSaveJSON: string
    dropdownViewer: string
    errorLabel: string
    errorMissingAuditInfo: string
    expandView: string
    footerIssue: string
    hide: string
    labDataTitle: string
    lsPerformanceCategoryDescription: string
    manualAuditsGroupTitle: string
    notApplicableAuditsGroupTitle: string
    opportunityResourceColumnLabel: string
    opportunitySavingsColumnLabel: string
    passedAuditsGroupTitle: string
    runtimeAnalysisWindow: string
    runtimeCustom: string
    runtimeDesktopEmulation: string
    runtimeMobileEmulation: string
    runtimeNoEmulation: string
    runtimeSettingsAxeVersion: string
    runtimeSettingsBenchmark: string
    runtimeSettingsCPUThrottling: string
    runtimeSettingsDevice: string
    runtimeSettingsNetworkThrottling: string
    runtimeSettingsUANetwork: string
    runtimeSingleLoad: string
    runtimeSingleLoadTooltip: string
    runtimeSlow4g: string
    runtimeUnknown: string
    show: string
    showRelevantAudits: string
    snippetCollapseButtonLabel: string
    snippetExpandButtonLabel: string
    thirdPartyResourcesLabel: string
    throttlingProvided: string
    toplevelWarningsMessage: string
    varianceDisclaimer: string
    viewOriginalTraceLabel: string
    viewTraceLabel: string
    viewTreemapLabel: string
    warningAuditsGroupTitle: string
    warningHeader: string
}

export interface IcuMessagePaths {
    "lighthouse-core/audits/is-on-https.js | title": string[]
    "lighthouse-core/audits/is-on-https.js | description": string[]
    "lighthouse-core/audits/service-worker.js | failureTitle": string[]
    "lighthouse-core/audits/service-worker.js | description": string[]
    "lighthouse-core/audits/viewport.js | title": string[]
    "lighthouse-core/audits/viewport.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | firstContentfulPaintMetric": string[]
    "lighthouse-core/audits/metrics/first-contentful-paint.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | seconds": Second[]
    "lighthouse-core/lib/i18n/i18n.js | largestContentfulPaintMetric": string[]
    "lighthouse-core/audits/metrics/largest-contentful-paint.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | firstMeaningfulPaintMetric": string[]
    "lighthouse-core/audits/metrics/first-meaningful-paint.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | speedIndexMetric": string[]
    "lighthouse-core/audits/metrics/speed-index.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | totalBlockingTimeMetric": string[]
    "lighthouse-core/audits/metrics/total-blocking-time.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | ms": M[]
    "lighthouse-core/lib/i18n/i18n.js | maxPotentialFIDMetric": string[]
    "lighthouse-core/audits/metrics/max-potential-fid.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | cumulativeLayoutShiftMetric": string[]
    "lighthouse-core/audits/metrics/cumulative-layout-shift.js | description": string[]
    "lighthouse-core/audits/errors-in-console.js | failureTitle": string[]
    "lighthouse-core/audits/errors-in-console.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnSource": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnDescription": string[]
    "lighthouse-core/audits/server-response-time.js | title": string[]
    "lighthouse-core/audits/server-response-time.js | description": string[]
    "lighthouse-core/audits/server-response-time.js | displayValue": LighthouseCoreAuditsServerResponseTimeJsDisplayValue[]
    "lighthouse-core/lib/i18n/i18n.js | columnURL": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnTimeSpent": string[]
    "lighthouse-core/lib/i18n/i18n.js | interactiveMetric": string[]
    "lighthouse-core/audits/metrics/interactive.js | description": string[]
    "lighthouse-core/audits/user-timings.js | title": string[]
    "lighthouse-core/audits/user-timings.js | description": string[]
    "lighthouse-core/audits/critical-request-chains.js | title": string[]
    "lighthouse-core/audits/critical-request-chains.js | description": string[]
    "lighthouse-core/audits/critical-request-chains.js | displayValue": LighthouseCoreAuditsCriticalRequestChainsJsDisplayValue[]
    "lighthouse-core/audits/redirects.js | title": string[]
    "lighthouse-core/audits/redirects.js | description": string[]
    "lighthouse-core/audits/installable-manifest.js | failureTitle": string[]
    "lighthouse-core/audits/installable-manifest.js | description": string[]
    "lighthouse-core/audits/installable-manifest.js | displayValue": LighthouseCoreAuditsInstallableManifestJsDisplayValue[]
    "lighthouse-core/audits/installable-manifest.js | columnValue": string[]
    "lighthouse-core/audits/apple-touch-icon.js | title": string[]
    "lighthouse-core/audits/apple-touch-icon.js | description": string[]
    "lighthouse-core/audits/apple-touch-icon.js | precomposedWarning": string[]
    "lighthouse-core/audits/splash-screen.js | failureTitle": string[]
    "lighthouse-core/audits/splash-screen.js | description": string[]
    "lighthouse-core/audits/themed-omnibox.js | failureTitle": string[]
    "lighthouse-core/audits/themed-omnibox.js | description": string[]
    "lighthouse-core/audits/maskable-icon.js | failureTitle": string[]
    "lighthouse-core/audits/maskable-icon.js | description": string[]
    "lighthouse-core/audits/content-width.js | title": string[]
    "lighthouse-core/audits/content-width.js | description": string[]
    "lighthouse-core/audits/image-aspect-ratio.js | title": string[]
    "lighthouse-core/audits/image-aspect-ratio.js | description": string[]
    "lighthouse-core/audits/image-size-responsive.js | title": string[]
    "lighthouse-core/audits/image-size-responsive.js | description": string[]
    "lighthouse-core/audits/preload-fonts.js | title": string[]
    "lighthouse-core/audits/preload-fonts.js | description": string[]
    "lighthouse-core/audits/deprecations.js | title": string[]
    "lighthouse-core/audits/deprecations.js | description": string[]
    "lighthouse-core/audits/mainthread-work-breakdown.js | failureTitle": string[]
    "lighthouse-core/audits/mainthread-work-breakdown.js | description": string[]
    "lighthouse-core/audits/mainthread-work-breakdown.js | columnCategory": string[]
    "lighthouse-core/audits/bootup-time.js | title": string[]
    "lighthouse-core/audits/bootup-time.js | description": string[]
    "lighthouse-core/audits/bootup-time.js | columnTotal": string[]
    "lighthouse-core/audits/bootup-time.js | columnScriptEval": string[]
    "lighthouse-core/audits/bootup-time.js | columnScriptParse": string[]
    "lighthouse-core/audits/uses-rel-preload.js | title": string[]
    "lighthouse-core/audits/uses-rel-preload.js | description": string[]
    "lighthouse-core/audits/uses-rel-preconnect.js | title": string[]
    "lighthouse-core/audits/uses-rel-preconnect.js | description": string[]
    "lighthouse-core/audits/font-display.js | failureTitle": string[]
    "lighthouse-core/audits/font-display.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnWastedBytes": string[]
    "lighthouse-core/audits/network-rtt.js | title": string[]
    "lighthouse-core/audits/network-rtt.js | description": string[]
    "lighthouse-core/audits/network-server-latency.js | title": string[]
    "lighthouse-core/audits/network-server-latency.js | description": string[]
    "lighthouse-core/audits/performance-budget.js | title": string[]
    "lighthouse-core/audits/performance-budget.js | description": string[]
    "lighthouse-core/audits/timing-budget.js | title": string[]
    "lighthouse-core/audits/timing-budget.js | description": string[]
    "lighthouse-core/audits/resource-summary.js | title": string[]
    "lighthouse-core/audits/resource-summary.js | description": string[]
    "lighthouse-core/audits/resource-summary.js | displayValue": LighthouseCoreAuditsResourceSummaryJsDisplayValue[]
    "lighthouse-core/lib/i18n/i18n.js | columnResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnRequests": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnTransferSize": string[]
    "lighthouse-core/lib/i18n/i18n.js | totalResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | imageResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | scriptResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | fontResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | stylesheetResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | documentResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | otherResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | mediaResourceType": string[]
    "lighthouse-core/lib/i18n/i18n.js | thirdPartyResourceType": string[]
    "lighthouse-core/audits/third-party-summary.js | title": string[]
    "lighthouse-core/audits/third-party-summary.js | description": string[]
    "lighthouse-core/audits/third-party-summary.js | displayValue": LighthouseCoreAuditsThirdPartySummaryJsDisplayValue[]
    "lighthouse-core/audits/third-party-summary.js | columnThirdParty": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnBlockingTime": string[]
    "lighthouse-core/audits/third-party-facades.js | title": string[]
    "lighthouse-core/audits/third-party-facades.js | description": string[]
    "lighthouse-core/audits/largest-contentful-paint-element.js | title": string[]
    "lighthouse-core/audits/largest-contentful-paint-element.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | displayValueElementsFound": LighthouseCoreLibI18nI18nJsDisplayValueElementsFound[]
    "lighthouse-core/lib/i18n/i18n.js | columnElement": string[]
    "lighthouse-core/audits/lcp-lazy-loaded.js | title": string[]
    "lighthouse-core/audits/lcp-lazy-loaded.js | description": string[]
    "lighthouse-core/audits/layout-shift-elements.js | title": string[]
    "lighthouse-core/audits/layout-shift-elements.js | description": string[]
    "lighthouse-core/audits/layout-shift-elements.js | columnContribution": string[]
    "lighthouse-core/audits/long-tasks.js | title": string[]
    "lighthouse-core/audits/long-tasks.js | description": string[]
    "lighthouse-core/audits/long-tasks.js | displayValue": LighthouseCoreAuditsLongTasksJsDisplayValue[]
    "lighthouse-core/lib/i18n/i18n.js | columnStartTime": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnDuration": string[]
    "lighthouse-core/audits/no-unload-listeners.js | title": string[]
    "lighthouse-core/audits/no-unload-listeners.js | description": string[]
    "lighthouse-core/audits/non-composited-animations.js | title": string[]
    "lighthouse-core/audits/non-composited-animations.js | description": string[]
    "lighthouse-core/audits/non-composited-animations.js | displayValue": LighthouseCoreAuditsNonCompositedAnimationsJsDisplayValue[]
    "lighthouse-core/lib/i18n/i18n.js | columnName": string[]
    "lighthouse-core/audits/non-composited-animations.js | unsupportedCSSProperty": LighthouseCoreAuditsNonCompositedAnimationsJsUnsupportedCssproperty[]
    "lighthouse-core/audits/non-composited-animations.js | unsupportedTimingParameters": string[]
    "lighthouse-core/audits/unsized-images.js | failureTitle": string[]
    "lighthouse-core/audits/unsized-images.js | description": string[]
    "lighthouse-core/audits/valid-source-maps.js | failureTitle": string[]
    "lighthouse-core/audits/valid-source-maps.js | description": string[]
    "lighthouse-core/audits/valid-source-maps.js | columnMapURL": string[]
    "lighthouse-core/audits/valid-source-maps.js | missingSourceMapErrorMessage": string[]
    "lighthouse-core/audits/preload-lcp-image.js | title": string[]
    "lighthouse-core/audits/preload-lcp-image.js | description": string[]
    "lighthouse-core/audits/csp-xss.js | title": string[]
    "lighthouse-core/audits/csp-xss.js | description": string[]
    "lighthouse-core/audits/csp-xss.js | columnDirective": string[]
    "lighthouse-core/audits/csp-xss.js | columnSeverity": string[]
    "lighthouse-core/lib/i18n/i18n.js | itemSeverityHigh": string[]
    "lighthouse-core/audits/csp-xss.js | noCsp": string[]
    "lighthouse-core/audits/manual/pwa-cross-browser.js | title": string[]
    "lighthouse-core/audits/manual/pwa-cross-browser.js | description": string[]
    "lighthouse-core/audits/manual/pwa-page-transitions.js | title": string[]
    "lighthouse-core/audits/manual/pwa-page-transitions.js | description": string[]
    "lighthouse-core/audits/manual/pwa-each-page-has-url.js | title": string[]
    "lighthouse-core/audits/manual/pwa-each-page-has-url.js | description": string[]
    "lighthouse-core/audits/accessibility/accesskeys.js | title": string[]
    "lighthouse-core/audits/accessibility/accesskeys.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-allowed-attr.js | failureTitle": string[]
    "lighthouse-core/audits/accessibility/aria-allowed-attr.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnFailingElem": string[]
    "lighthouse-core/audits/accessibility/aria-command-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-command-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-hidden-body.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-hidden-body.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-hidden-focus.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-hidden-focus.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-input-field-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-input-field-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-meter-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-meter-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-progressbar-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-progressbar-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-required-attr.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-required-attr.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-required-children.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-required-children.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-required-parent.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-required-parent.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-roles.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-roles.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-toggle-field-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-toggle-field-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-tooltip-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-tooltip-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-treeitem-name.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-treeitem-name.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-valid-attr-value.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-valid-attr-value.js | description": string[]
    "lighthouse-core/audits/accessibility/aria-valid-attr.js | title": string[]
    "lighthouse-core/audits/accessibility/aria-valid-attr.js | description": string[]
    "lighthouse-core/audits/accessibility/button-name.js | title": string[]
    "lighthouse-core/audits/accessibility/button-name.js | description": string[]
    "lighthouse-core/audits/accessibility/bypass.js | title": string[]
    "lighthouse-core/audits/accessibility/bypass.js | description": string[]
    "lighthouse-core/audits/accessibility/color-contrast.js | failureTitle": string[]
    "lighthouse-core/audits/accessibility/color-contrast.js | description": string[]
    "lighthouse-core/audits/accessibility/definition-list.js | title": string[]
    "lighthouse-core/audits/accessibility/definition-list.js | description": string[]
    "lighthouse-core/audits/accessibility/dlitem.js | title": string[]
    "lighthouse-core/audits/accessibility/dlitem.js | description": string[]
    "lighthouse-core/audits/accessibility/document-title.js | title": string[]
    "lighthouse-core/audits/accessibility/document-title.js | description": string[]
    "lighthouse-core/audits/accessibility/duplicate-id-active.js | title": string[]
    "lighthouse-core/audits/accessibility/duplicate-id-active.js | description": string[]
    "lighthouse-core/audits/accessibility/duplicate-id-aria.js | title": string[]
    "lighthouse-core/audits/accessibility/duplicate-id-aria.js | description": string[]
    "lighthouse-core/audits/accessibility/form-field-multiple-labels.js | title": string[]
    "lighthouse-core/audits/accessibility/form-field-multiple-labels.js | description": string[]
    "lighthouse-core/audits/accessibility/frame-title.js | title": string[]
    "lighthouse-core/audits/accessibility/frame-title.js | description": string[]
    "lighthouse-core/audits/accessibility/heading-order.js | title": string[]
    "lighthouse-core/audits/accessibility/heading-order.js | description": string[]
    "lighthouse-core/audits/accessibility/html-has-lang.js | title": string[]
    "lighthouse-core/audits/accessibility/html-has-lang.js | description": string[]
    "lighthouse-core/audits/accessibility/html-lang-valid.js | title": string[]
    "lighthouse-core/audits/accessibility/html-lang-valid.js | description": string[]
    "lighthouse-core/audits/accessibility/image-alt.js | title": string[]
    "lighthouse-core/audits/accessibility/image-alt.js | description": string[]
    "lighthouse-core/audits/accessibility/input-image-alt.js | title": string[]
    "lighthouse-core/audits/accessibility/input-image-alt.js | description": string[]
    "lighthouse-core/audits/accessibility/label.js | title": string[]
    "lighthouse-core/audits/accessibility/label.js | description": string[]
    "lighthouse-core/audits/accessibility/link-name.js | title": string[]
    "lighthouse-core/audits/accessibility/link-name.js | description": string[]
    "lighthouse-core/audits/accessibility/list.js | title": string[]
    "lighthouse-core/audits/accessibility/list.js | description": string[]
    "lighthouse-core/audits/accessibility/listitem.js | title": string[]
    "lighthouse-core/audits/accessibility/listitem.js | description": string[]
    "lighthouse-core/audits/accessibility/meta-refresh.js | title": string[]
    "lighthouse-core/audits/accessibility/meta-refresh.js | description": string[]
    "lighthouse-core/audits/accessibility/meta-viewport.js | failureTitle": string[]
    "lighthouse-core/audits/accessibility/meta-viewport.js | description": string[]
    "lighthouse-core/audits/accessibility/object-alt.js | title": string[]
    "lighthouse-core/audits/accessibility/object-alt.js | description": string[]
    "lighthouse-core/audits/accessibility/tabindex.js | title": string[]
    "lighthouse-core/audits/accessibility/tabindex.js | description": string[]
    "lighthouse-core/audits/accessibility/td-headers-attr.js | title": string[]
    "lighthouse-core/audits/accessibility/td-headers-attr.js | description": string[]
    "lighthouse-core/audits/accessibility/th-has-data-cells.js | title": string[]
    "lighthouse-core/audits/accessibility/th-has-data-cells.js | description": string[]
    "lighthouse-core/audits/accessibility/valid-lang.js | title": string[]
    "lighthouse-core/audits/accessibility/valid-lang.js | description": string[]
    "lighthouse-core/audits/accessibility/video-caption.js | title": string[]
    "lighthouse-core/audits/accessibility/video-caption.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | failureTitle": string[]
    "lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/uses-long-cache-ttl.js | displayValue": LighthouseCoreAuditsByteEfficiencyUsesLongCacheTtlJsDisplayValue[]
    "lighthouse-core/lib/i18n/i18n.js | columnCacheTTL": string[]
    "lighthouse-core/audits/byte-efficiency/total-byte-weight.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/total-byte-weight.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/total-byte-weight.js | displayValue": LighthouseCoreAuditsByteEfficiencyTotalByteWeightJsDisplayValue[]
    "lighthouse-core/audits/byte-efficiency/offscreen-images.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/offscreen-images.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/render-blocking-resources.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/render-blocking-resources.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | displayValueMsSavings": DisplayValueMsSaving[]
    "lighthouse-core/audits/byte-efficiency/unminified-css.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/unminified-css.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/unminified-javascript.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/unminified-javascript.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/unused-css-rules.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/unused-css-rules.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | displayValueByteSavings": DisplayValueByteSaving[]
    "lighthouse-core/audits/byte-efficiency/unused-javascript.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/unused-javascript.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/modern-image-formats.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/modern-image-formats.js | description": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnResourceSize": string[]
    "lighthouse-core/audits/byte-efficiency/uses-optimized-images.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/uses-optimized-images.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/uses-text-compression.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/uses-text-compression.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/uses-responsive-images.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/uses-responsive-images.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/efficient-animated-content.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/efficient-animated-content.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/duplicated-javascript.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/duplicated-javascript.js | description": string[]
    "lighthouse-core/audits/byte-efficiency/legacy-javascript.js | title": string[]
    "lighthouse-core/audits/byte-efficiency/legacy-javascript.js | description": string[]
    "lighthouse-core/audits/dobetterweb/doctype.js | title": string[]
    "lighthouse-core/audits/dobetterweb/doctype.js | description": string[]
    "lighthouse-core/audits/dobetterweb/charset.js | title": string[]
    "lighthouse-core/audits/dobetterweb/charset.js | description": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | title": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | description": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | displayValue": LighthouseCoreAuditsDobetterwebDomSizeJsDisplayValue[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | columnStatistic": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | columnValue": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMElements": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMDepth": string[]
    "lighthouse-core/audits/dobetterweb/dom-size.js | statisticDOMWidth": string[]
    "lighthouse-core/audits/dobetterweb/geolocation-on-start.js | title": string[]
    "lighthouse-core/audits/dobetterweb/geolocation-on-start.js | description": string[]
    "lighthouse-core/audits/dobetterweb/inspector-issues.js | title": string[]
    "lighthouse-core/audits/dobetterweb/inspector-issues.js | description": string[]
    "lighthouse-core/audits/dobetterweb/no-document-write.js | title": string[]
    "lighthouse-core/audits/dobetterweb/no-document-write.js | description": string[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | failureTitle": string[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | description": string[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | displayValue": LighthouseCoreAuditsDobetterwebNoVulnerableLibrariesJsDisplayValue[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnVersion": string[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnVuln": string[]
    "lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js | columnSeverity": string[]
    "lighthouse-core/audits/dobetterweb/js-libraries.js | title": string[]
    "lighthouse-core/audits/dobetterweb/js-libraries.js | description": string[]
    "lighthouse-core/audits/dobetterweb/js-libraries.js | columnVersion": string[]
    "lighthouse-core/audits/dobetterweb/notification-on-start.js | title": string[]
    "lighthouse-core/audits/dobetterweb/notification-on-start.js | description": string[]
    "lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js | title": string[]
    "lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js | description": string[]
    "lighthouse-core/audits/dobetterweb/uses-http2.js | title": string[]
    "lighthouse-core/audits/dobetterweb/uses-http2.js | description": string[]
    "lighthouse-core/audits/dobetterweb/uses-passive-event-listeners.js | failureTitle": string[]
    "lighthouse-core/audits/dobetterweb/uses-passive-event-listeners.js | description": string[]
    "lighthouse-core/audits/seo/meta-description.js | title": string[]
    "lighthouse-core/audits/seo/meta-description.js | description": string[]
    "lighthouse-core/audits/seo/http-status-code.js | title": string[]
    "lighthouse-core/audits/seo/http-status-code.js | description": string[]
    "lighthouse-core/audits/seo/font-size.js | title": string[]
    "lighthouse-core/audits/seo/font-size.js | description": string[]
    "lighthouse-core/audits/seo/font-size.js | displayValue": LighthouseCoreAuditsSeoFontSizeJsDisplayValue[]
    "lighthouse-core/audits/seo/font-size.js | columnSelector": string[]
    "lighthouse-core/audits/seo/font-size.js | columnPercentPageText": string[]
    "lighthouse-core/audits/seo/font-size.js | columnFontSize": string[]
    "lighthouse-core/audits/seo/font-size.js | legibleText": string[]
    "lighthouse-core/audits/seo/link-text.js | title": string[]
    "lighthouse-core/audits/seo/link-text.js | description": string[]
    "lighthouse-core/audits/seo/crawlable-anchors.js | failureTitle": string[]
    "lighthouse-core/audits/seo/crawlable-anchors.js | description": string[]
    "lighthouse-core/audits/seo/crawlable-anchors.js | columnFailingLink": string[]
    "lighthouse-core/audits/seo/is-crawlable.js | title": string[]
    "lighthouse-core/audits/seo/is-crawlable.js | description": string[]
    "lighthouse-core/audits/seo/robots-txt.js | title": string[]
    "lighthouse-core/audits/seo/robots-txt.js | description": string[]
    "lighthouse-core/audits/seo/tap-targets.js | failureTitle": string[]
    "lighthouse-core/audits/seo/tap-targets.js | description": string[]
    "lighthouse-core/audits/seo/tap-targets.js | displayValue": LighthouseCoreAuditsSeoTapTargetsJsDisplayValue[]
    "lighthouse-core/audits/seo/tap-targets.js | tapTargetHeader": string[]
    "lighthouse-core/lib/i18n/i18n.js | columnSize": string[]
    "lighthouse-core/audits/seo/tap-targets.js | overlappingTargetHeader": string[]
    "lighthouse-core/audits/seo/hreflang.js | title": string[]
    "lighthouse-core/audits/seo/hreflang.js | description": string[]
    "lighthouse-core/audits/seo/plugins.js | title": string[]
    "lighthouse-core/audits/seo/plugins.js | description": string[]
    "lighthouse-core/audits/seo/canonical.js | title": string[]
    "lighthouse-core/audits/seo/canonical.js | description": string[]
    "lighthouse-core/audits/seo/manual/structured-data.js | title": string[]
    "lighthouse-core/audits/seo/manual/structured-data.js | description": string[]
    "lighthouse-core/config/default-config.js | performanceCategoryTitle": string[]
    "lighthouse-core/config/default-config.js | a11yCategoryTitle": string[]
    "lighthouse-core/config/default-config.js | a11yCategoryDescription": string[]
    "lighthouse-core/config/default-config.js | a11yCategoryManualDescription": string[]
    "lighthouse-core/config/default-config.js | bestPracticesCategoryTitle": string[]
    "lighthouse-core/config/default-config.js | seoCategoryTitle": string[]
    "lighthouse-core/config/default-config.js | seoCategoryDescription": string[]
    "lighthouse-core/config/default-config.js | seoCategoryManualDescription": string[]
    "lighthouse-core/config/default-config.js | pwaCategoryTitle": string[]
    "lighthouse-core/config/default-config.js | pwaCategoryDescription": string[]
    "lighthouse-core/config/default-config.js | pwaCategoryManualDescription": string[]
    "lighthouse-core/config/default-config.js | metricGroupTitle": string[]
    "lighthouse-core/config/default-config.js | loadOpportunitiesGroupTitle": string[]
    "lighthouse-core/config/default-config.js | loadOpportunitiesGroupDescription": string[]
    "lighthouse-core/config/default-config.js | budgetsGroupTitle": string[]
    "lighthouse-core/config/default-config.js | budgetsGroupDescription": string[]
    "lighthouse-core/config/default-config.js | diagnosticsGroupTitle": string[]
    "lighthouse-core/config/default-config.js | diagnosticsGroupDescription": string[]
    "lighthouse-core/config/default-config.js | pwaInstallableGroupTitle": string[]
    "lighthouse-core/config/default-config.js | pwaOptimizedGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yBestPracticesGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yBestPracticesGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yColorContrastGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yColorContrastGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yNamesLabelsGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yNamesLabelsGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yNavigationGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yNavigationGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yAriaGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yAriaGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yLanguageGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yLanguageGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yAudioVideoGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yAudioVideoGroupDescription": string[]
    "lighthouse-core/config/default-config.js | a11yTablesListsVideoGroupTitle": string[]
    "lighthouse-core/config/default-config.js | a11yTablesListsVideoGroupDescription": string[]
    "lighthouse-core/config/default-config.js | seoMobileGroupTitle": string[]
    "lighthouse-core/config/default-config.js | seoMobileGroupDescription": string[]
    "lighthouse-core/config/default-config.js | seoContentGroupTitle": string[]
    "lighthouse-core/config/default-config.js | seoContentGroupDescription": string[]
    "lighthouse-core/config/default-config.js | seoCrawlingGroupTitle": string[]
    "lighthouse-core/config/default-config.js | seoCrawlingGroupDescription": string[]
    "lighthouse-core/config/default-config.js | bestPracticesTrustSafetyGroupTitle": string[]
    "lighthouse-core/config/default-config.js | bestPracticesUXGroupTitle": string[]
    "lighthouse-core/config/default-config.js | bestPracticesBrowserCompatGroupTitle": string[]
    "lighthouse-core/config/default-config.js | bestPracticesGeneralGroupTitle": string[]
}

export interface Second {
    values: Values
    path: string
}

export interface Values {
    timeInMs: number
}

export interface M {
    values: Values2
    path: string
}

export interface Values2 {
    timeInMs: number
}

export interface LighthouseCoreAuditsServerResponseTimeJsDisplayValue {
    values: Values3
    path: string
}

export interface Values3 {
    timeInMs: number
}

export interface LighthouseCoreAuditsCriticalRequestChainsJsDisplayValue {
    values: Values4
    path: string
}

export interface Values4 {
    itemCount: number
}

export interface LighthouseCoreAuditsInstallableManifestJsDisplayValue {
    values: Values5
    path: string
}

export interface Values5 {
    itemCount: number
}

export interface LighthouseCoreAuditsResourceSummaryJsDisplayValue {
    values: Values6
    path: string
}

export interface Values6 {
    requestCount: number
    byteCount: number
}

export interface LighthouseCoreAuditsThirdPartySummaryJsDisplayValue {
    values: Values7
    path: string
}

export interface Values7 {
    timeInMs: number
}

export interface LighthouseCoreLibI18nI18nJsDisplayValueElementsFound {
    values: Values8
    path: string
}

export interface Values8 {
    nodeCount: number
}

export interface LighthouseCoreAuditsLongTasksJsDisplayValue {
    values: Values9
    path: string
}

export interface Values9 {
    itemCount: number
}

export interface LighthouseCoreAuditsNonCompositedAnimationsJsDisplayValue {
    values: Values10
    path: string
}

export interface Values10 {
    itemCount: number
}

export interface LighthouseCoreAuditsNonCompositedAnimationsJsUnsupportedCssproperty {
    values: Values11
    path: string
}

export interface Values11 {
    propertyCount: number
    properties: string
}

export interface LighthouseCoreAuditsByteEfficiencyUsesLongCacheTtlJsDisplayValue {
    values: Values12
    path: string
}

export interface Values12 {
    itemCount: number
}

export interface LighthouseCoreAuditsByteEfficiencyTotalByteWeightJsDisplayValue {
    values: Values13
    path: string
}

export interface Values13 {
    totalBytes: number
}

export interface DisplayValueMsSaving {
    values: Values14
    path: string
}

export interface Values14 {
    wastedMs: number
}

export interface DisplayValueByteSaving {
    values: Values15
    path: string
}

export interface Values15 {
    wastedBytes: number
}

export interface LighthouseCoreAuditsDobetterwebDomSizeJsDisplayValue {
    values: Values16
    path: string
}

export interface Values16 {
    itemCount: number
}

export interface LighthouseCoreAuditsDobetterwebNoVulnerableLibrariesJsDisplayValue {
    values: Values17
    path: string
}

export interface Values17 {
    itemCount: number
}

export interface LighthouseCoreAuditsSeoFontSizeJsDisplayValue {
    values: Values18
    path: string
}

export interface Values18 {
    decimalProportion: number
}

export interface LighthouseCoreAuditsSeoTapTargetsJsDisplayValue {
    values: Values19
    path: string
}

export interface Values19 {
    decimalProportion: number
}
